import { Router } from "express";
import { generateQuestionsService } from "../controllers/generateQuestions.controller";
import { generateArchitectureService } from "../controllers/generateArchitecture.controller";
import { iterateArchitectureService } from "../controllers/iterateArchitecture.controller";

const promptRouter = Router();

promptRouter.post("/generateQuestions", generateQuestionsService);
promptRouter.post("/generateArchitecture", generateArchitectureService);
promptRouter.post("/iterateArchitecture", iterateArchitectureService);

export default promptRouter