import AI from "../configs/aiConfigs";
import database from "../configs/database";
import { clerkClient } from "@clerk/express";
import { AuthenticatedRequest } from "../types";
import { Response } from "express";


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