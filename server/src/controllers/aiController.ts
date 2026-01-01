import database from "../configs/database";
import { clerkClient } from "@clerk/express";
import { AuthenticatedRequest } from "../types";
import { Response } from "express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import FormData from "form-data";
import { callGemini } from "../utils/callGemini";
import { extractTextFromPDF } from "../utils/pdfReader";
import { getAuthUser } from "../utils/authUser";

const incrementFreeUsage = async (
  userId: string,
  free_usage: number,
  plan?: string
) => {
  if (plan !== "premium") {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { free_usage: free_usage + 1 },
    });
  }
};

const checkFreeLimit = (plan?: string, free_usage = 0) => {
  return plan !== "premium" && free_usage >= 10;
};


export const generateArticle = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = await getAuthUser(req, res);
    if (!userId) return res;

    const { prompt, length } = req.body;
    const { plan, free_usage = 0 } = req;

    if (checkFreeLimit(plan, free_usage)) {
      return res.status(403).json({
        success: false,
        message: "Limit reached. Upgrade your plan to continue.",
      });
    }

    if (!prompt || !length) {
      return res.status(400).json({
        success: false,
        message: "Missing prompt or length",
      });
    }

    const content = await callGemini(
      `Write a ${length}-word article about: ${prompt}`
    );

    await database`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    await incrementFreeUsage(userId, free_usage, plan);

    return res.json({ success: true, content });
  } catch (error) {
    console.error("generateArticle error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const generateBlogTitle = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = await getAuthUser(req, res);
    if (!userId) return res;

    const { prompt } = req.body;
    const { plan, free_usage = 0 } = req;

    if (checkFreeLimit(plan, free_usage)) {
      return res.status(403).json({
        success: false,
        message: "Limit reached. Upgrade your plan to continue.",
      });
    }

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Missing prompt",
      });
    }

     const content = await callGemini(
      `Generate a short, catchy blog title about: ${prompt}`
    );

    await database`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    await incrementFreeUsage(userId, free_usage, plan);

    return res.json({ success: true, content });
  } catch (error) {
    console.error("generateBlogTitle error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const generateImage = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = await getAuthUser(req, res);
    if (!userId) return res;

    const { prompt, publish } = req.body;
    const { plan } = req;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is available for premium users only.",
      });
    }

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Missing prompt",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      process.env.CLIPDROP_API_URL ||
        "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY!,
        },
        responseType: "arraybuffer",
      }
    );

    const imageBase64 = `data:image/png;base64,${Buffer.from(data).toString(
      "base64"
    )}`;

    const { secure_url } = await cloudinary.uploader.upload(imageBase64);

    await database`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${!!publish})
    `;

    return res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("generateImage error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const removeImageBackground = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = await getAuthUser(req, res);
    if (!userId) return res;

    const image = req.file;
    const { plan } = req;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is available for premium users only.",
      });
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Missing file",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(
      `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
      {
        transformation: [{ effect: "background_removal" }],
      }
    );

    await database`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove image background', ${secure_url}, 'image')
    `;

    return res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("removeImageBackground error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const removeImageObject = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = await getAuthUser(req, res);
    if (!userId) return res;

    const image = req.file;
    const { object } = req.body;
    const { plan } = req;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is available for premium users only.",
      });
    }

    if (!image || !object) {
      return res.status(400).json({
        success: false,
        message: "Missing file or object",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(
      `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
      {
        transformation: [{ effect: `gen_remove:${object}` }],
      }
    );

    await database`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Remove ${object} from image`}, ${secure_url}, 'image')
    `;

    return res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("removeImageObject error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const reviewResume = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = await getAuthUser(req, res);
    if (!userId) return res;

    const resume = req.file;
    const { plan } = req;

    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is available for premium users only.",
      });
    }

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Missing file",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 5MB limit",
      });
    }

    if (resume.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    const resumeText = await extractTextFromPDF(resume.buffer);

    const prompt = `
      You are a professional technical recruiter.

      TASK:
      Analyze the resume below and produce a structured evaluation.

      RESPONSE FORMAT (MANDATORY):
      - Strengths (bullet points)
      - Weaknesses (bullet points)
      - Concrete improvements (actionable advice)
      - Overall score (0–10)

      DO NOT repeat the resume.
      DO NOT repeat the instructions.
      ONLY provide the analysis.

      RESUME:
      ${resumeText}
      `;

    const content = await callGemini(prompt);

    await database`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Review uploaded resume', ${content}, 'resume-review')
    `;

    return res.json({ success: true, content });
  } catch (error) {
    console.error("reviewResume error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
