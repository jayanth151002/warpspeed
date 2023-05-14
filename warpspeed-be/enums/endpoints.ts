import dotenv from "dotenv"

dotenv.config();

const apiUrl = process.env.API_URL as string

export const endpoints = {
    CHATCOMPLETION: "https://api.openai.com/v1/chat/completions",
    GEN_ARCH: apiUrl + "/generateArchitecture"
} as const