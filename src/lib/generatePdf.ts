import PDFDocument from "pdfkit";
import { pitchDocument as d } from "./pitchContent";

function collect(doc: PDFKit.PDFDocument): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk as Buffer));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
}

export async function generatePdfBuffer(): Promise<Buffer> {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 48, bottom: 48, left: 52, right: 52 },
    info: {
      Title: "FieldGrow Business Pitch",
      Author: "FieldGrow",
      Subject: "Field service + growth platform for business owners",
    },
  });

  const done = collect(doc);

  const teal = "#0F766E";
  const ink = "#071413";
  const muted = "#5A716E";
  const coral = "#FF5A36";

  doc.rect(0, 0, doc.page.width, 150).fill(teal);
  doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(28).text(d.title, 52, 42);
  doc.font("Helvetica").fontSize(12).text(d.subtitle, 52, 80, { width: 480 });
  doc.fontSize(10).fillColor("#D7FFF8").text(d.tagline, 52, 108, { width: 480 });

  let y = 175;
  const ensureSpace = (need = 80) => {
    if (y > doc.page.height - need) {
      doc.addPage();
      y = 52;
    }
  };

  const h = (title: string) => {
    ensureSpace(100);
    doc.fillColor(coral).font("Helvetica-Bold").fontSize(14).text(title, 52, y);
    y = doc.y + 10;
  };

  const p = (text: string, opts?: { bold?: boolean }) => {
    ensureSpace(70);
    doc
      .fillColor(ink)
      .font(opts?.bold ? "Helvetica-Bold" : "Helvetica")
      .fontSize(10.5)
      .text(text, 52, y, { width: 490, lineGap: 2 });
    y = doc.y + 8;
  };

  const bullet = (text: string) => {
    ensureSpace(60);
    doc.fillColor(ink).font("Helvetica").fontSize(10.5).text(`•  ${text}`, 60, y, {
      width: 470,
      lineGap: 2,
    });
    y = doc.y + 6;
  };

  h("Executive Promise");
  d.intro.forEach((line) => p(line));
  p(`Unique selling proposition: ${d.usp}`, { bold: true });

  h("How FieldGrow Helps Business Owners");
  d.promise.forEach(bullet);

  for (const audience of d.audiences) {
    h(audience.title);
    audience.points.forEach(bullet);
  }

  h("Core Field Management Features");
  for (const feature of d.coreFeatures) {
    p(feature.name, { bold: true });
    p(`Business impact: ${feature.help}`);
  }

  h("Growth & Unique Features");
  for (const feature of d.growthFeatures) {
    p(feature.name, { bold: true });
    p(`Business impact: ${feature.help}`);
  }

  h(`${d.usp} — The Story`);
  d.loopStory.forEach((step, i) => bullet(`${i + 1}. ${step}`));

  h("Why Business Owners Choose FieldGrow");
  d.closing.forEach((line) => p(line));

  h("Next Step");
  p(d.contact.note);
  p(`Email: ${d.contact.email}`, { bold: true });
  p(`Phone: ${d.contact.phone}`, { bold: true });

  doc
    .moveTo(52, doc.page.height - 36)
    .lineTo(doc.page.width - 52, doc.page.height - 36)
    .strokeColor(teal)
    .stroke();
  doc
    .fillColor(muted)
    .fontSize(8)
    .text("FieldGrow · Service-to-Growth Engine™ · Confidential product overview", 52, doc.page.height - 28, {
      width: 490,
      align: "center",
    });

  doc.end();
  return done;
}
