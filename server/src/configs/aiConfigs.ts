import OpenAi from "openai";


const AI = new OpenAi({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: process.env.GEMINI_API_URL || "https://generativelanguage.googleapis.com/v1beta/openai/",
})

export default AI