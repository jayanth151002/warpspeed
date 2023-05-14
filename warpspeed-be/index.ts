import express, { Request, Response } from "express"
import promptRouter from "./routes/prompts";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use("/prompts", promptRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});