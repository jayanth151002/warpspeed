import { Request, Response } from "express";
import { apiClient } from "../config";
import { endpoints } from "../enums/endpoints";
import { getGenerateQuestionsPrompt } from "../utils/getGenerateQuestionsPrompt";

export const generateQuestionsService = async (req: Request, res: Response) => {
    const bizProb: string = req.body.bizProb;
    apiClient
        .post(endpoints.CHATCOMPLETION, {
            model: "gpt-4-0314",
            messages: [{ "role": "user", "content": getGenerateQuestionsPrompt(bizProb) }],
            temperature: 0,
            max_tokens: 2048,
        })
        .then((result) => {
            const data = result.data.choices[0].message.content
            res.send(JSON.parse(data));
        })
        .catch((err) => {
            console.log(err.message)
            res.json(err.message);
        });
}