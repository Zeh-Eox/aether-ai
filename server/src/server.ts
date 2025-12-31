import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary";
import aiRouter from "./routes/aiRoutes";
import userRouter from "./routes/userRoutes";

const app = express();

async function startServer() {
  await connectCloudinary();

  app.use(cors());
  app.use(express.json());
  app.use(clerkMiddleware());

  app.get("/", (req: Request, res: Response) => {
    res.send("Server is Live");
  });

  app.use(requireAuth());

  app.use('/api/v1/ai', aiRouter);
  app.use('/api/v1/user', userRouter);

  const PORT: number = Number(process.env.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();