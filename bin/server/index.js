import env from "../env.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "../services/mongoose.js";
import { limiter } from "./middlewares/ratelimit.js";
import { apiRoutes } from "./routes/index.js";
export const startServer = async () => {
    await connectDB("server");
    const app = express();
    // Content-Type
    app.use(express.json());
    // Security
    app.use(cors());
    app.use(helmet());
    // Logging
    app.use(morgan(":method :url :status - :response-time ms"));
    // Routes
    app.use("/api", limiter, apiRoutes);
    const port = env.PORT || 5000;
    return new Promise((resolve) => {
        const server = app.listen(port, () => {
            console.log("✅[Server]: Express server is ready");
            console.log(`
          \x1b[35m\n 🚀 DORA-tracker 1.0.0\x1b[0m
          - Local:\thttp://localhost:${port}/
          
          Note that the development build is not optimized.
          To create a production build, use \x1b[32mnpm run build\x1b[0m.\n
        `);
            resolve(server);
        });
    });
};
