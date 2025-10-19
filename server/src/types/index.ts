import { Request } from "express";
import { Multer } from "multer";

export interface AuthenticatedRequest extends Request {
  plan?: string;
  free_usage?: number;
  auth?: () => Promise<{ userId: string; has: (options: { plan: string }) => Promise<boolean> }>;
  file?: Express.Multer.File | undefined;
}