import axios from "axios";
import { Request, Response } from "express";
import { endpoints } from "../enums/endpoints";

export const generateArchitectureService = async (req: Request, res: Response) => {
    const bizProb: string = req.body.bizProb;
    const answers: string[] = req.body.answers;
    const input = bizProb + ". " + answers.join(". ");
    console.log(input)
    axios.get(endpoints.GEN_ARCH, {
        data: {
            prompt: input
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