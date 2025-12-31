import { geminiModel } from "../configs/aiConfigs";

export const callGemini = async (prompt: string): Promise<string> => {
  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
