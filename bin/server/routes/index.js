import { Router } from "express";
import { jobRoutes } from "./job.routes.js";
import { webhookRoutes } from "./webhook.routes.js";
const router = Router();
router.get("/health", (req, res) => {
    res.status(200).json({
        msg: "Server is healthy",
        last_checked: new Date().toISOString(),
    });
});
router.use("/v1/jobs", jobRoutes);
router.use("/v1/webhooks", webhookRoutes);
export { router as apiRoutes };
