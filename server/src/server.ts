import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary";
import aiRouter from "./routes/aiRoutes";
import userRouter from "./routes/userRoutes";

const app = express();

app.set("trust proxy", 1);

connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live 🚀");
});

app.use(requireAuth());

app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/user", userRouter);

export default app;