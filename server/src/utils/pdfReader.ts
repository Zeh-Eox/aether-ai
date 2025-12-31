import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const extractTextFromPDF = async (filePath: string): Promise<string> => {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const strings = content.items.map((item: any) => item.str);
    text += strings.join(" ") + "\n";
  }

  return text;
};

export { extractTextFromPDF };