import axios from "axios";
import { Request, Response } from "express";
import { endpoints } from "../enums/endpoints";
import { getIteratedArchitecturePrompt } from "../utils/getIteratedArchitecturePrompt";
import { apiClient } from "../config";

interface RequestBody {
    bizProb: string;
    recentArchitecture: string;
    constraint: string
}

export const iterateArchitectureService = async (req: Request, res: Response) => {
    const { bizProb, recentArchitecture, constraint }: RequestBody = req.body;
   const input = getIteratedArchitecturePrompt(bizProb, recentArchitecture, constraint);
    apiClient.post(endpoints.CHATCOMPLETION, {
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": input }],
    })
        .then((result) => {
            const data = result.data
            res.json(data);
        })
        .catch((err) => {
            res.json(err.message);
        });
}