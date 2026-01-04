export const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  const pdfParse = (await import("pdf-parse")).default as any;
  
  const data = await pdfParse(buffer);
  
  return data.text;
};