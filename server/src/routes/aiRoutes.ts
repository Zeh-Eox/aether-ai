import express from "express";
import { auth } from "../middlewares/auth";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  reviewResume,
} from "../controllers/aiController";
import upload from "../configs/multer";
import { aiRateLimiter } from "../middlewares/rateLimiter";

const aiRouter = express.Router();

aiRouter.post("/generate-article", auth, aiRateLimiter, generateArticle);
aiRouter.post("/generate-blog-title", auth, aiRateLimiter, generateBlogTitle);
aiRouter.post("/generate-image", auth, aiRateLimiter, generateImage);
aiRouter.post("/remove-image-background", aiRateLimiter, auth, upload.single("image"), removeImageBackground);
aiRouter.post("/remove-image-object", auth, aiRateLimiter, upload.single("image"), removeImageObject);
aiRouter.post("/review-resume", auth, aiRateLimiter, upload.single("resume"), reviewResume);

export default aiRouter;
