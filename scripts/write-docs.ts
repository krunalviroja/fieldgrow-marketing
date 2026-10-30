import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { generateDocxBuffer } from "../src/lib/generateDocx";
import { generatePdfBuffer } from "../src/lib/generatePdf";

async function main() {
  const publicDocs = join(process.cwd(), "public", "docs");
  const workspaceDocs = join(process.cwd(), "..", "FieldGrow-Pitch-Docs");

  mkdirSync(publicDocs, { recursive: true });
  mkdirSync(workspaceDocs, { recursive: true });

  const [pdf, docx] = await Promise.all([generatePdfBuffer(), generateDocxBuffer()]);

  const pdfName = "FieldGrow-Business-Pitch.pdf";
  const docxName = "FieldGrow-Business-Pitch.docx";

  writeFileSync(join(publicDocs, pdfName), pdf);
  writeFileSync(join(publicDocs, docxName), docx);
  writeFileSync(join(workspaceDocs, pdfName), pdf);
  writeFileSync(join(workspaceDocs, docxName), docx);

  console.log("Generated:");
  console.log(` - ${join(publicDocs, pdfName)}`);
  console.log(` - ${join(publicDocs, docxName)}`);
  console.log(` - ${join(workspaceDocs, pdfName)}`);
  console.log(` - ${join(workspaceDocs, docxName)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});