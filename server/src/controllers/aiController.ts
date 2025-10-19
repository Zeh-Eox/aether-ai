import AI from "../configs/aiConfigs";
import database from "../configs/database";
import { clerkClient } from "@clerk/express";
import { AuthenticatedRequest } from "../types";
import { Response } from "express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import * as pdfParse from "pdf-parse";


export const generateArticle = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const { userId } = await req.auth!();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage ?? 0;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
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

    const response = await AI.chat.completions.create({
      model: process.env.AI_AGENT_MODEL!,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: Number(length),
    });

    const content = response.choices?.[0]?.message?.content ?? "";

    await database`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    return res.json({ success: true, content });
  } catch (error: any) {
    console.error("generateArticle error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};



export const generateBlogTitle = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const { userId } = await req.auth!();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage ?? 0;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
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

    const response = await AI.chat.completions.create({
      model: process.env.AI_AGENT_MODEL!,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices?.[0]?.message?.content ?? "";

    await database`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    return res.json({ success: true, content });
  } catch (error: any) {
    console.error("generateBlogTitle error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};



export const generateImage = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const { userId } = await req.auth!();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
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

    const formData = new FormData()
    formData.append('prompt', prompt)

    const { data } = await axios.post(process.env.CLIPDROP_API_URL || "https://clipdrop-api.co/text-to-image/v1", formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API_KEY
      },
      responseType: 'arraybuffer'
    })

    const imageBase64 = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

    const { secure_url } = await cloudinary.uploader.upload(imageBase64);

    await database`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ? true : false})
    `;

    return res.json({ success: true, content: secure_url });
  } catch (error: any) {
    console.error("generateImage error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};



export const removeImageBackground = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const { userId } = await req.auth!();
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
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

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        }
      ]
    });

    await database`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove image background', ${secure_url}, 'image')
    `;

    return res.json({ success: true, content: secure_url });
  } catch (error: any) {
    console.error("removeImageBackground error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};



export const removeImageObject = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const { userId } = await req.auth!();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
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

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const { secure_url } = await cloudinary.uploader.upload(`cloudinary://remove_object/v1/${public_id}`, {
      transformation: [{effect: `gen_remove:${object}`}],
      resource_type: 'image'
    });

    await database`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Remove ${object} from image`}, ${secure_url}, 'image')
    `;

    return res.json({ success: true, content: secure_url });
  } catch (error: any) {
    console.error("removeImageBackground error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};



export const reviewResume = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const { userId } = await req.auth!();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
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

    if(resume.size > 5 * 1024 * 1024)
    {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 5MB limit",
      });
    }

    if(resume.mimetype !== 'application/pdf')
    {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await (pdfParse as any).default(dataBuffer);

    const prompt = `Review the following resume and provide feedback on its strengths and areas for improvement. ResumeContent:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: process.env.AI_AGENT_MODEL!,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices?.[0]?.message?.content ?? "";

    await database`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')
    `;

    return res.json({ success: true, content: content });
  } catch (error: any) {
    console.error("removeImageBackground error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};