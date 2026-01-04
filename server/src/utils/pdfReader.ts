export const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const pdfjsLib = pdfjs.default ?? pdfjs;

  // Désactiver le worker pour éviter les problèmes en serverless
  pdfjsLib.GlobalWorkerOptions.workerSrc = "";

  const data = new Uint8Array(buffer);
  const pdf = await pdfjsLib.getDocument({ 
    data,
    useSystemFonts: true,
    standardFontDataUrl: undefined
  }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(" ") + "\n";
  }

  return text;
};