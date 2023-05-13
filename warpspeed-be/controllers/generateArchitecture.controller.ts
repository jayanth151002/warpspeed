import { Request, Response } from "express";
import { apiClient } from "../config";
import { endpoints } from "../enums/endpoints";
import { getGenerateArchitecturePrompt } from "../utils/getGenerateArchitecturePrompt";
import { RequestBody } from "../types/requestBody";
import { ChatOpenAI } from "langchain/chat_models/openai";
import dotenv from "dotenv"
import { HumanChatMessage } from "langchain/schema";


dotenv.config();
const apiKey = process.env.OPENAI_KEY;


export const generateArchitectureService = async (req: Request, res: Response) => {
    const { chat, bizIssue }: RequestBody = req.body;
    const openai = new ChatOpenAI({
        openAIApiKey: apiKey,
        temperature: 0.9,
        maxTokens: 2048,
        streaming: true
    });
    const data = getGenerateArchitecturePrompt(chat, bizIssue)
    await openai.call([
        new HumanChatMessage(data)
    ]).then((result) => { res.send(result.text) })
        .catch((err) => {
            console.log(err.message)
            res.json(err.message);
        })

    // apiClient
    //     .post(endpoints.CHATCOMPLETION, {
    //         model: "gpt-4-0314",
    //         messages: [{ "role": "user", "content": getGenerateArchitecturePrompt(chat, bizIssue) }],
    //         temperature: 1,
    //         max_tokens: 2048,
    //     })
    //     .then((result) => {
    //         const data = result.data.choices[0].message.content
    //         res.send(JSON.parse(data));
    //     })
    //     .catch((err) => {
    //         console.log(err.message)
    //         res.json(err.message);
    //     });
}