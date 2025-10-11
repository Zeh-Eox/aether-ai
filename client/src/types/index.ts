import type { LucideIcon } from "lucide-react";
import type React from "react";

export interface RouteItem {
  title: string,
  route: string,
  component: React.ComponentType,
  isAiRoute: boolean
}

export interface AiTool {
  title: string;
  description: string;
  Icon: LucideIcon;
  bg: { from: string; to: string };
  path: string;
}

export interface DummyTestimonial {
  image: string;
  name: string;
  title: string;
  content: string;
  rating: number;
}

export interface DummyCreation {
  id: number;
  user_id: string;
  prompt: string;
  content: string;
  type: string;
  publish: boolean;
  likes: string[];
  created_at: string;
  updated_at: string;
}

export interface DummyPublishedCreation {
  id: number;
  user_id: string;
  prompt: string;
  content: string;
  type: "image";
  publish: true;
  likes: string[];
  created_at: string;
  updated_at: string;
  __v?: number;
}

export interface NavItems {
  to: string,
  label: string,
  Icon: LucideIcon
}

export interface ArticleLength {
  length: number,
  text: string
}