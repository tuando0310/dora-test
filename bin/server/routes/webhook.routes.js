import { Router } from "express";
import WebhookController from "../controllers/webhook.controller.js";
const router = Router();
router.post("/github", WebhookController.handleGithubWebhook);
router.post("/google", WebhookController.handleGoogleWebhook);
export { router as webhookRoutes };
