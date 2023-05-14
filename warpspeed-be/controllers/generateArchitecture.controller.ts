import axios from "axios";
import { Request, Response } from "express";
import { endpoints } from "../enums/endpoints";
import { apiClient } from "../config";
import { getGenerateArchitecturePrompt } from "../utils/getGenerateArchitecturePrompt";

export const generateArchitectureService = async (req: Request, res: Response) => {
    const bizProb: string = req.body.bizProb;
    const answers: string[] = req.body.answers;
    const input = bizProb + ". " + answers.join(". ");
    apiClient.post(endpoints.CHATCOMPLETION, {
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": getGenerateArchitecturePrompt(input) }],
    })
        .then((result) => {
            const data = result.data.choices[0].message.content
            axios.post(endpoints.GEN_ARCH, {
                prompt: data
            })
                .then((result) => {
                    const data = result.data
                    res.json(data);
                })
                .catch((err) => {
                    res.json(err);
                });
        })
        .catch((err) => {
            res.json("OpenAI: " + err.message);
        });
}