import axios from "axios";
import { Request, Response } from "express";
import { endpoints } from "../enums/endpoints";

export const generateIaCService = async (req: Request, res: Response) => {
    const recentArchitecture: string = req.body.recentArchitecture;
    axios.get(endpoints.GEN_IAC, {
        data: {
            prompt: recentArchitecture
        },
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((result) => {
            const data = result.data
            res.json(data);
        })
        .catch((err) => {
            res.json(err.message);
        });
}