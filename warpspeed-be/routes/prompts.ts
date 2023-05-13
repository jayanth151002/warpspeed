import { Router } from "express";
import { generateQuestionsService } from "../controllers/generateQuestions.controller";
import { generateArchitectureService } from "../controllers/generateArchitecture.controller";

const promptRouter = Router();

promptRouter.post("/generateQuestions", generateQuestionsService);
promptRouter.post("/generateArchitecture", generateArchitectureService);

export default promptRouter