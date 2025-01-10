import env from "../env.js";
import mongoose from "mongoose";
export const connectDB = async (serviceName) => {
    try {
        await mongoose.connect(env.MONGO_URI, { dbName: env.MONGO_DB_NAME });
        console.log(`📦 MongoDB Connected for ${serviceName}`);
        return mongoose.connection;
    }
    catch (err) {
        console.error(`[DB]: MongoDB connection error for ${serviceName}: ${err}`);
        process.exit(1);
    }
};
