import dotenv from "dotenv"
import axios from "axios";

dotenv.config();

const apiKey = process.env.OPENAI_KEY;

export const apiClient = axios.create({
    headers: {
        ContentType: "application/json",
        Authorization: "Bearer " + apiKey,
    },
});