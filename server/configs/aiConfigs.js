import OpenAi from "openai";


const AI = new OpenAi({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
})

export default AI