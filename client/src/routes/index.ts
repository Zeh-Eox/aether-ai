import Home from "../pages/Home";
import BlogTitle from "../pages/BlogTitle";
import Dashboard from "../pages/Dashboard";
import GenerateImage from "../pages/GenerateImage";
import type { RouteItem } from "../types";
import RemoveBackground from "../pages/RemoveBackground";
import RemoveObject from "../pages/RemoveObject";
import ReviewResume from "../pages/ReviewResume";
import WriteArticle from "../pages/WriteArticle";
import NotFound from "../pages/NotFound";


export const ROUTES: RouteItem[] = [
  {
    title: "Blog Title",
    route: "blog-title",
    component: BlogTitle,
    isAiRoute: true
  },
  {
    title: "Dashboard",
    route: "",
    component: Dashboard,
    isAiRoute: true
  },
  {
    title: "Generate Image",
    route: "generate-image",
    component: GenerateImage,
    isAiRoute: true
  },
  {
    title: "Home",
    route: "/",
    component: Home,
    isAiRoute: false
  },
  {
    title: "Remove Background",
    route: "remove-background",
    component: RemoveBackground,
    isAiRoute: true
  },
  {
    title: "Remove Object",
    route: "remove-object",
    component: RemoveObject,
    isAiRoute: true
  },
  {
    title: "Review Resume",
    route: "review-resume",
    component: ReviewResume,
    isAiRoute: true
  },
  {
    title: "Write Article",
    route: "write-article",
    component: WriteArticle,
    isAiRoute: true
  },
  {
    title: "Page Not Found",
    route: "*",
    component: NotFound,
    isAiRoute: false
  }
]