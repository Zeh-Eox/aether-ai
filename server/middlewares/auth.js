import { clerkClient } from "@clerk/express";

export const auth = async (request, response, next) => {
  try {
    const { userId, has } = await request.auth();
    const hasPremiumPlan = await has({plan: "premium"});

    const user = await clerkClient.users.getUser(userId);

    if(!hasPremiumPlan && user.privateMetadata.free_usage) 
    {
      request.free_usage = user.privateMetadata.free_usage;
    } else 
    {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0
        }
      })

      request.free_usage = 0;
    }

    request.plan = hasPremiumPlan ? 'premium' : 'free';
    next();
  } catch (error) {
    response.json({ success: false, message: error.message });
  }
}