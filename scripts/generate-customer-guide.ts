import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import PDFDocument from "pdfkit";
import {
  AlignmentType, Bookmark, BorderStyle, Document, ExternalHyperlink, Footer,
  Header, HeadingLevel, InternalHyperlink, Packer, PageNumber, Paragraph,
  ShadingType, Table, TableCell, TableRow, TextRun, WidthType,
} from "docx";

// This standalone generator deliberately produces static resource downloads.
// The shorter Business Pitch and its API remain independently generated.
type Block = { kind: "heading"; level: number; text: string; anchor: string }
  | { kind: "text"; text: string }
  | { kind: "flow"; text: string }
  | { kind: "table"; rows: string[][] };
const root = process.cwd();
const source = readFileSync(join(root, "docs/FieldGrow-Customer-Product-Guide.md"), "utf8");
const blocks: Block[] = [];
const lines = source.split(/\r?\n/);
let headingIndex = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const heading = line.match(/^(#{1,3}) (.+)$/);
  if (heading) {
    blocks.push({ kind: "heading", level: heading[1].length, text: heading[2], anchor: `guide_${headingIndex++}` });
  } else if (line.startsWith("|")) {
    const rows: string[][] = [];
    while (i < lines.length && lines[i].trim().startsWith("|")) {
      const cells = lines[i].trim().slice(1, -1).split("|").map((cell) => cell.trim());
      if (!cells.every((cell) => /^[-: ]+$/.test(cell))) rows.push(cells);
      i++;
    }
    i--;
    blocks.push({ kind: "table", rows });
  } else {
    blocks.push({ kind: line.includes(" → ") && !line.includes(".") ? "flow" : "text", text: line });
  }
}
const start = blocks.findIndex((block) => block.kind === "heading" && block.text === "Executive summary");
const body = blocks.slice(start);
const contents = body.filter((block): block is Extract<Block, { kind: "heading" }> => block.kind === "heading" && block.level === 2);
const colors = { green: "145A46", light: "E9F5EE", ink: "263532", muted: "576B64", white: "FFFFFF", line: "CDDCD3" };

function runs(text: string) {
  const fragments = text.split(/(https:\/\/[^\s]+|hello@fieldgrow\.app)/g);
  return fragments.filter(Boolean).map((fragment) => /^(https:\/\/|hello@)/.test(fragment)
    ? new ExternalHyperlink({ link: fragment.startsWith("hello@") ? `mailto:${fragment}` : fragment, children: [new TextRun({ text: fragment, style: "Hyperlink", color: colors.green })] })
    : new TextRun({ text: fragment }));
}

async function createWord() {
  const children: (Paragraph | Table)[] = [
    new Paragraph({ spacing: { before: 900, after: 360 }, children: [new TextRun({ text: "FIELDGROW", bold: true, size: 64, color: colors.green })] }),
    new Paragraph({ spacing: { after: 260 }, children: [new TextRun({ text: "Customer Product Guide", bold: true, size: 54, color: colors.ink })] }),
    new Paragraph({ text: "Field Service Management and Business Growth Platform", spacing: { after: 240 } }),
    new Paragraph({ text: "Business Operating System for Field Service Businesses", spacing: { after: 320 } }),
    new Paragraph({ shading: { type: ShadingType.CLEAR, fill: colors.light }, spacing: { before: 100, after: 500 }, children: [new TextRun({ text: "Run your field team. Get more customers. Get paid faster. Bring customers back.", bold: true, color: colors.green, size: 26 })] }),
    new Paragraph({ text: "Customer edition | Version 1.0 | 3 November 2026", spacing: { after: 200 } }),
    new Paragraph({ children: runs("https://fieldgrow-marketing.vercel.app/") }),
    new Paragraph({ children: runs("hello@fieldgrow.app | +91 98765 43210") }),
    new Paragraph({ text: "Table of contents", heading: HeadingLevel.HEADING_1, pageBreakBefore: true }),
  ];
  for (const item of contents) {
    children.push(new Paragraph({ spacing: { after: 100 }, children: [new InternalHyperlink({ anchor: item.anchor, children: [new TextRun({ text: item.text, color: colors.green })] })] }));
  }
  for (const block of body) {
    if (block.kind === "heading") {
      children.push(new Paragraph({
        heading: block.level === 2 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2,
        pageBreakBefore: block.level === 2,
        children: [new Bookmark({ id: block.anchor, children: [new TextRun({ text: block.text })] })],
      }));
    } else if (block.kind === "table") {
      children.push(new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: block.rows.map((row, i) => new TableRow({
          tableHeader: i === 0, cantSplit: true,
          children: row.map((cell) => new TableCell({
            margins: { top: 90, bottom: 90, left: 100, right: 100 },
            shading: { type: ShadingType.CLEAR, fill: i === 0 ? colors.green : i % 2 ? colors.light : colors.white },
            children: [new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: cell, size: 18, bold: i === 0, color: i === 0 ? colors.white : colors.ink })] })],
          })),
        })),
      }));
      children.push(new Paragraph({ spacing: { after: 80 } }));
    } else {
      children.push(new Paragraph({
        spacing: { after: 150, line: 275 },
        ...(block.kind === "flow" ? { shading: { type: ShadingType.CLEAR, fill: colors.light }, border: { left: { style: BorderStyle.SINGLE, size: 20, color: colors.green, space: 8 } } } : {}),
        children: runs(block.text),
      }));
    }
  }
  return Packer.toBuffer(new Document({
    creator: "FieldGrow", title: "FieldGrow Customer Product Guide", description: "Customer and service operations through repeat revenue",
    styles: { default: {
      document: { run: { font: "Calibri", size: 22, color: colors.ink } },
      heading1: { run: { font: "Calibri", size: 34, bold: true, color: colors.green }, paragraph: { spacing: { before: 200, after: 220 }, keepNext: true } },
      heading2: { run: { font: "Calibri", size: 27, bold: true, color: colors.green }, paragraph: { spacing: { before: 240, after: 140 }, keepNext: true } },
    } },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1000, bottom: 1000, left: 850, right: 850, header: 400, footer: 400 } } },
      headers: { default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: "FIELDGROW  /  CUSTOMER PRODUCT GUIDE", size: 16, color: colors.muted })], border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: colors.line, space: 8 } } })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Customer edition | 1.0     •     ", size: 16, color: colors.muted }), new TextRun({ children: [PageNumber.CURRENT], size: 16 }), new TextRun({ text: " / ", size: 16 }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16 })] })] }) },
      children,
    }],
  }));
}

async function createPdf() {
  const pdf = new PDFDocument({ size: "A4", bufferPages: true, margins: { top: 64, bottom: 65, left: 48, right: 48 }, info: { Title: "FieldGrow Customer Product Guide", Author: "FieldGrow" } });
  const regular = join(root, "public/fonts/GuideSans.ttf");
  const bold = join(root, "public/fonts/GuideSans-Bold.ttf");
  pdf.registerFont("Guide", regular).registerFont("GuideBold", bold);
  const output = new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    pdf.on("data", (chunk: Buffer) => chunks.push(chunk));
    pdf.on("end", () => resolve(Buffer.concat(chunks)));
    pdf.on("error", reject);
  });
  const w = pdf.page.width - 96;
  const bottom = pdf.page.height - 80;
  let y = 64;
  const headings: { text: string; page: number; anchor: string }[] = [];
  const currentPage = () => pdf.bufferedPageRange().count;
  function page() { pdf.addPage(); y = 64; }
  function ensure(height: number) { if (y + height > bottom) page(); }
  function text(value: string, size = 10, font = "Guide", color = colors.ink, gap = 10) {
    pdf.font(font).fontSize(size);
    const height = pdf.heightOfString(value, { width: w, lineGap: 3 });
    ensure(height);
    pdf.fillColor(`#${color}`).text(value, 48, y, { width: w, lineGap: 3 });
    y = pdf.y + gap;
  }
  pdf.rect(0, 0, pdf.page.width, pdf.page.height).fill(`#${colors.green}`);
  pdf.fillColor(`#${colors.light}`).font("GuideBold").fontSize(15).text("FIELDGROW", 48, 70);
  pdf.fontSize(36).fillColor(`#${colors.white}`).text("Customer\nProduct Guide", 48, 160, { width: w, lineGap: 8 });
  pdf.font("Guide").fontSize(17).text("Field Service Management\nand Business Growth Platform", 48, 310, { width: w, lineGap: 5 });
  pdf.fontSize(12).fillColor(`#${colors.light}`).text("Run your field team. Get more customers.\nGet paid faster. Bring customers back.", 48, 420, { width: w, lineGap: 5 });
  pdf.fontSize(10).text("Customer edition | Version 1.0 | 3 November 2026", 48, 560);
  pdf.text("https://fieldgrow-marketing.vercel.app/", 48, 600, { link: "https://fieldgrow-marketing.vercel.app/" });
  pdf.text("hello@fieldgrow.app", 48, 628, { link: "mailto:hello@fieldgrow.app" });
  pdf.text("+91 98765 43210", 48, 656, { link: "tel:+919876543210" });
  page(); // Reserved contents page, filled after final page numbers are known.
  for (const block of body) {
    if (block.kind === "heading") {
      if (block.level === 2) {
        page();
        headings.push({ text: block.text, page: currentPage(), anchor: block.anchor });
      } else ensure(105);
      pdf.addNamedDestination(block.anchor, "XYZ", 48, y, null);
      text(block.text, block.level === 2 ? 22 : 14, "GuideBold", colors.green, 15);
    } else if (block.kind === "flow") {
      pdf.font("GuideBold").fontSize(10);
      const height = pdf.heightOfString(block.text, { width: w - 24, lineGap: 4 }) + 24;
      ensure(height);
      pdf.roundedRect(48, y, w, height, 7).fill(`#${colors.light}`);
      pdf.fillColor(`#${colors.green}`).text(block.text, 60, y + 12, { width: w - 24, lineGap: 4 });
      y += height + 12;
    } else if (block.kind === "table") {
      const cols = block.rows[0].length;
      const colWidth = w / cols;
      const drawRow = (row: string[], header: boolean, index: number) => {
        pdf.font(header ? "GuideBold" : "Guide").fontSize(8.2);
        const height = Math.max(...row.map((cell) => pdf.heightOfString(cell, { width: colWidth - 16, lineGap: 2 }))) + 18;
        if (y + height > bottom) {
          page();
          if (!header) drawRow(block.rows[0], true, 0);
        }
        const top = y;
        row.forEach((cell, c) => {
          pdf.rect(48 + c * colWidth, top, colWidth, height).fill(`#${header ? colors.green : index % 2 ? colors.light : colors.white}`);
          pdf.font(header ? "GuideBold" : "Guide").fontSize(8.2).fillColor(`#${header ? colors.white : colors.ink}`)
            .text(cell, 56 + c * colWidth, top + 8, { width: colWidth - 16, lineGap: 2 });
        });
        y = top + height;
      };
      block.rows.forEach((row, i) => drawRow(row, i === 0, i));
      y += 14;
    } else {
      const link = block.text.match(/https:\/\/\S+|hello@fieldgrow\.app/);
      const top = y;
      const oldPage = currentPage();
      text(block.text);
      if (link && oldPage === currentPage()) {
        pdf.link(48, top, w, y - top - 10, link[0].startsWith("hello@") ? `mailto:${link[0]}` : link[0]);
      }
    }
  }
  pdf.switchToPage(1);
  y = 64;
  text("Table of contents", 25, "GuideBold", colors.green, 18);
  text("Click a section to open it. Use the capability checklist before planning a rollout.", 10, "Guide", colors.muted, 20);
  for (const item of headings) {
    pdf.font("Guide").fontSize(10);
    const height = pdf.heightOfString(item.text, { width: w - 35 }) + 12;
    pdf.fillColor(`#${colors.green}`).text(item.text, 48, y, { width: w - 35, goTo: item.anchor });
    pdf.text(String(item.page), 48 + w - 28, y, { width: 28, align: "right", goTo: item.anchor });
    y += height;
  }
  const total = pdf.bufferedPageRange().count;
  for (let i = 1; i < total; i++) {
    pdf.switchToPage(i);
    pdf.font("Guide").fontSize(8).fillColor(`#${colors.muted}`)
      .text("FIELDGROW  /  CUSTOMER PRODUCT GUIDE", 48, 29, { width: w, lineBreak: false });
    pdf.moveTo(48, 45).lineTo(48 + w, 45).lineWidth(.5).strokeColor(`#${colors.line}`).stroke();
    pdf.text(`Customer edition | 1.0     •     ${i + 1} / ${total}`, 48, pdf.page.height - 49, { width: w, lineBreak: false });
  }
  pdf.end();
  return output;
}

async function main() {
  if (/\blead(?:s|\s+management|\s+crm|\s+pipeline|\s+generation|\s+tracking)?\b/i.test(source)) throw new Error("Out-of-scope terminology found in guide");
  const [word, pdf] = await Promise.all([createWord(), createPdf()]);
  for (const folder of ["public/docs", "../FieldGrow-Pitch-Docs"]) {
    writeFileSync(join(root, folder, "FieldGrow-Customer-Product-Guide.docx"), word);
    writeFileSync(join(root, folder, "FieldGrow-Customer-Product-Guide.pdf"), pdf);
  }
  console.log("Generated FieldGrow-Customer-Product-Guide.docx and .pdf in public/docs and ../FieldGrow-Pitch-Docs");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
