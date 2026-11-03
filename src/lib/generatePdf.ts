import PDFDocument from "pdfkit";
import { pitchDocument as d } from "./pitchContent";

// Standard PDF fonts do not contain the rupee/arrow glyphs. Keep amounts and
// journeys readable on every deployment without depending on host fonts.
function pdfText(text: string) {
  return text.replaceAll("₹", "Rs. ").replaceAll("→", " > ");
}

export async function generatePdfBuffer(): Promise<Buffer> {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 52, bottom: 58, left: 52, right: 52 },
    info: { Title: "FieldGrow | Run the work. Grow the business.", Author: "FieldGrow", Subject: d.subtitle },
    bufferPages: true,
  });
  const done = new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
  const ink = "#0B1020";
  const paper = "#FAF6EE";
  const saffron = "#FF9F1C";
  const mint = "#19D3A2";
  const width = doc.page.width - 104;

  function background() {
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(paper);
    doc.rect(0, 0, doc.page.width, 7).fill(saffron);
  }
  background();
  doc.on("pageAdded", background);
  doc.rect(0, 0, doc.page.width, 285).fill(ink);
  doc.fillColor(saffron).font("Helvetica-Bold").fontSize(30).text(d.title, 52, 36);
  doc.fillColor(paper).fontSize(26).text(d.headline, 52, 88, { width, lineGap: 3 });
  doc.fillColor(mint).fontSize(11).text(d.subtitle, 52, 180, { width });
  doc.fillColor(paper).font("Helvetica").fontSize(10).text(d.tagline, 52, 212, { width, lineGap: 3 });
  let y = 315;

  for (const section of d.sections) {
    doc.font("Helvetica-Bold").fontSize(15);
    const headingHeight = doc.heightOfString(pdfText(section.title), { width });
    if (y + headingHeight + 90 > doc.page.height - 65) {
      doc.addPage();
      y = 52;
    }
    doc.fillColor(ink).text(pdfText(section.title), 52, y, { width });
    y = doc.y + 14;
    doc.moveTo(52, y - 7).lineTo(90, y - 7).strokeColor(saffron).lineWidth(3).stroke();
    for (const paragraph of section.paragraphs) {
      doc.font("Helvetica").fontSize(10.5);
      const height = doc.heightOfString(pdfText(paragraph), { width, lineGap: 3 });
      if (y + height > doc.page.height - 65) {
        doc.addPage();
        y = 52;
      }
      doc.fillColor("#42506A").text(pdfText(paragraph), 52, y, { width, lineGap: 3 });
      y = doc.y + 12;
    }
    y += 12;
  }
  if (y + 70 > doc.page.height - 65) { doc.addPage(); y = 52; }
  doc.fillColor(ink).font("Helvetica-Bold").fontSize(12).text(d.contact.note, 52, y, { width });
  doc.fillColor("#42506A").font("Helvetica").fontSize(11).text(d.contact.email, { link: `mailto:${d.contact.email}` });

  const pages = doc.bufferedPageRange();
  for (let i = pages.start; i < pages.start + pages.count; i++) {
    doc.switchToPage(i);
    doc.fillColor("#748099").font("Helvetica").fontSize(8).text(
      `FIELDGROW / SERVICE-TO-GROWTH ENGINE     |     ${i + 1} / ${pages.count}`,
      52, doc.page.height - 68, { width, lineBreak: false },
    );
  }
  doc.end();
  return done;
}
