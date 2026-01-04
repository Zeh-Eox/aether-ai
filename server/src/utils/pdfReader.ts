export const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  const PDFParser = (await import("pdf2json")).default;
  
  return new Promise((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, 1);
    
    pdfParser.on("pdfParser_dataError", (errData: any) => 
      reject(new Error(errData.parserError))
    );
    
    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        const text = pdfData.Pages?.map((page: any) =>
          page.Texts?.map((text: any) =>
            text.R?.map((r: any) => decodeURIComponent(r.T || "")).join("") || ""
          ).join(" ") || ""
        ).join("\n") || "";
        
        resolve(text);
      } catch (error) {
        reject(error);
      }
    });
    
    pdfParser.parseBuffer(buffer);
  });
};