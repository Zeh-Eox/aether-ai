import { Eraser, FileText, Hash, House, Image, Scissors, SquarePen, Users } from "lucide-react";
import type { ArticleLength, NavItems } from "../types";

export const navItems: NavItems[] = [
  {
    to: "/ai",
    label: "Dashboard",
    Icon: House
  },
  {
    to: "/ai/write-article",
    label: "Write Articles",
    Icon: SquarePen
  },
  {
    to: "/ai/blog-title",
    label: "Blog Titles",
    Icon: Hash
  },
  {
    to: "/ai/generate-image",
    label: "Generate Images",
    Icon: Image
  },
  {
    to: "/ai/remove-background",
    label: "Remove Background",
    Icon: Eraser
  },
  {
    to: "/ai/remove-object",
    label: "Remove Objects",
    Icon: Scissors
  },
  {
    to: "/ai/review-resume",
    label: "Review Resume",
    Icon: FileText
  },
  {
    to: "/ai/community",
    label: "Community",
    Icon: Users
  },
]

export const articleLength: ArticleLength[] = [
  { length: 800, text: "Short (500-800 words)" },
  { length: 1200, text: "Medium (800-1200 words)" },
  { length: 1600, text: "Long (1200+ words)" },
]

export const blogCategories: string[] = [
  'General', 'Business', 'Technology', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food'
]

export const imageStyles: string[] = [
  'Realistic Style', 'Ghibli Style', 'Anime Style', 'Cartoon Style', 'Fantasy Style', '3D Style'
]