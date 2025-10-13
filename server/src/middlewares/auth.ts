import { Response, NextFunction } from "express";
import { clerkClient } from "@clerk/express";
import { AuthenticatedRequest } from "../types";

export const auth = async (request: AuthenticatedRequest, response: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, has } = await request.auth!();
    const hasPremiumPlan = await has({ plan: "premium" });
    const user = await clerkClient.users.getUser(userId);

    if (!hasPremiumPlan && user.privateMetadata.free_usage) {
      request.free_usage = user.privateMetadata.free_usage as number;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: 0 },
      });
      request.free_usage = 0;
    }

    request.plan = hasPremiumPlan ? "premium" : "free";

    next();
  } catch (error: any) {
    response.json({ success: false, message: error.message });
  }
};
