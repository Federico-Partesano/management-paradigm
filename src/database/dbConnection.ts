// import { Logger } from '@utils/logger';
import mongoose from "mongoose";

export const isRunningOnAtlas = () =>
  process.env.NODE_ENV === "stage" || process.env.NODE_ENV === "production";

const dbUrl = isRunningOnAtlas()
  ? String(process.env.MONGDB_URI)
  : "mongodb+srv://test:fnT3WtRqkD2ljAjK@cluster0.r5qez.mongodb.net/?retryWrites=true&w=majority";

export const dbConnection = () => {
  console.log(`Attempting to connect to ${dbUrl}`);
  return mongoose.connect(dbUrl, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: process.env.NODE_ENV === "production" ? 10 : 5,
    keepAliveInitialDelay: 60000, // 1 minute
  });
};
