import { Router } from "express";
import { JobController } from "../controllers/job.controller.js";
const router = Router();
router.get("/:id", JobController.getJobStatus);
router.post("/", JobController.queueJob);
export { router as jobRoutes };
