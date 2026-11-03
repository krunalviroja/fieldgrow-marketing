import { AlignmentType, BorderStyle, Document, Footer, HeadingLevel, Packer, PageNumber, Paragraph, TextRun } from "docx";
import { pitchDocument as d } from "./pitchContent";

export async function generateDocxBuffer(): Promise<Buffer> {
  const children: Paragraph[] = [
    new Paragraph({ spacing: { after: 220 }, children: [new TextRun({ text: d.title, bold: true, size: 64, color: "0B1020" })] }),
    new Paragraph({ spacing: { after: 260 }, children: [new TextRun({ text: d.headline, bold: true, size: 44, color: "0B1020" })] }),
    new Paragraph({ spacing: { after: 180 }, children: [new TextRun({ text: d.subtitle, bold: true, size: 24, color: "42506A" })] }),
    new Paragraph({
      spacing: { after: 360 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: "FF9F1C", space: 14 } },
      children: [new TextRun({ text: d.tagline, size: 22, color: "42506A" })],
    }),
  ];
  for (const section of d.sections) {
    children.push(new Paragraph({ text: section.title, heading: HeadingLevel.HEADING_1 }));
    for (const paragraph of section.paragraphs) {
      children.push(new Paragraph({ text: paragraph, spacing: { after: 180, line: 290 } }));
    }
  }
  children.push(new Paragraph({ spacing: { before: 180, after: 120 }, children: [new TextRun({ text: d.contact.note, bold: true })] }));
  children.push(new Paragraph({ text: d.contact.email }));

  return Packer.toBuffer(new Document({
    creator: "FieldGrow",
    title: "FieldGrow | Run the work. Grow the business.",
    description: d.subtitle,
    background: { color: "FAF6EE" },
    styles: {
      default: {
        document: { run: { font: "Calibri", size: 22, color: "42506A" } },
        heading1: { run: { font: "Calibri", size: 30, bold: true, color: "0B1020" }, paragraph: { spacing: { before: 360, after: 180 }, keepNext: true } },
      },
    },
    sections: [{
      properties: { page: { margin: { top: 720, bottom: 800, left: 864, right: 864 } } },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
        new TextRun({ text: "FIELDGROW / SERVICE-TO-GROWTH ENGINE  |  ", size: 16, color: "748099" }),
        new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "748099" }),
      ] })] }) },
      children,
    }],
  }));
}
