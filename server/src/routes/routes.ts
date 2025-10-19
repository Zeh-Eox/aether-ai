import express from "express";
import { auth } from "../middlewares/auth";
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageObject, reviewResume } from "../controllers/aiController";
import upload from "../configs/multer";

const router = express.Router();

router.post('/generate-article', auth, generateArticle);
router.post('/generate-blog-title', auth, generateBlogTitle);
router.post('/generate-image', auth, generateImage);
router.post('/remove-image-background', upload.single('image'), auth, removeImageBackground);
router.post('/remove-image-object', upload.single('image'), auth, removeImageObject);
router.post('/review-resume', upload.single('resume'), auth, reviewResume);

export default router;