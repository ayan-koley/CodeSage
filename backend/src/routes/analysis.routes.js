import { Router } from "express";
import { createAnalysisController } from "../controllers/analysis.controllers.js";

const route = Router();

route.route("/").post(createAnalysisController);

export default route;