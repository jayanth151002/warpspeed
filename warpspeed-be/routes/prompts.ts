import { Router } from "express";
import { generateQuestionsService } from "../controllers/generateQuestions.controller";
import { generateArchitectureService } from "../controllers/generateArchitecture.controller";
import { iterateArchitectureService } from "../controllers/iterateArchitecture.controller";
import { generateSysDesService } from "../controllers/generateSysDes.controller";
import { generateIaCService } from "../controllers/generateIaC.controller";

const promptRouter = Router();

promptRouter.post("/generateQuestions", generateQuestionsService);
promptRouter.post("/generateArchitecture", generateArchitectureService);
promptRouter.post("/iterateArchitecture", iterateArchitectureService);
promptRouter.post("/generateSysDes", generateSysDesService);
promptRouter.post("/generateIaC", generateIaCService);

export default promptRouter