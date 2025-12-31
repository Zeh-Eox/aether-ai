import { Request, Response } from "express";
import { getAuthUser } from "../utils/authUser";
import database from "../configs/database";

export const getUserCreations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = await getAuthUser(req, res);
    if (!userId) return res;

    const creations = await database`
      SELECT *
      FROM creations
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return res.status(200).json({
      success: true,
      creations,
    });
  } catch (error) {
    console.error("Error fetching user creations:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getPublishedCreations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {

    const publishedCreations = await database`
      SELECT *
      FROM creations
      WHERE publish = true
      ORDER BY created_at DESC
    `;

    return res.status(200).json({
      success: true,
      publishedCreations,
    });
  } catch (error) {
    console.error("Error fetching published creations:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const toggleLikeCreation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = await getAuthUser(req, res);
    const { id } = req.body;

    if (!userId || !id) {
      return res.status(400).json({
        success: false,
        message: "Missing user or creation id",
      });
    }

    const [creation] = await database`
      SELECT likes
      FROM creations
      WHERE id = ${id}
    `;

    if (!creation) {
      return res.status(404).json({
        success: false,
        message: "Creation not found",
      });
    }

    const userIdStr = userId.toString();
    const currentLikes: string[] = creation.likes ?? [];

    const hasLiked = currentLikes.includes(userIdStr);

    const updatedLikes = hasLiked
      ? currentLikes.filter((likeId) => likeId !== userIdStr)
      : [...currentLikes, userIdStr];

    await database`
      UPDATE creations
      SET likes = ${updatedLikes}
      WHERE id = ${id}
    `;

    return res.status(200).json({
      success: true,
      message: hasLiked ? "Like removed" : "Like added",
      likesCount: updatedLikes.length,
    });
  } catch (error) {
    console.error("Error toggling like on creation:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};