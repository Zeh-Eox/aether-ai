import { Response } from "express";
import { AuthenticatedRequest } from "../types";

const getAuthUser = async (req: AuthenticatedRequest, res: Response) => {
  const auth = await req.auth?.();
  if (!auth?.userId) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return null;
  }
  return auth.userId;
};

export { getAuthUser };