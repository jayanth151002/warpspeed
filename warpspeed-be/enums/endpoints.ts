import dotenv from "dotenv"

dotenv.config();

const apiUrl = process.env.API_URL as string

export const endpoints = {
    CHATCOMPLETION: "https://api.openai.com/v1/chat/completions",
    GEN_ARCH: apiUrl + "/get-cloud-architecture",
    GEN_SYS_DES: apiUrl + "/get-system-diagram",
    GEN_IAC: apiUrl + "/get-cloud-iac",
} as const