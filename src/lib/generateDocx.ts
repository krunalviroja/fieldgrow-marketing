import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  BorderStyle,
} from "docx";
import { pitchDocument as d } from "./pitchContent";

function heading(text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel] = HeadingLevel.HEADING_1) {
  return new Paragraph({
    text,
    heading: level,
    spacing: { before: 320, after: 140 },
  });
}

function body(text: string, opts?: { bold?: boolean }) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text,
        bold: opts?.bold,
        size: 22,
        font: "Calibri",
        color: "1C3331",
      }),
    ],
  });
}

function bullet(text: string) {
  return new Paragraph({
    spacing: { after: 80 },
    bullet: { level: 0 },
    children: [new TextRun({ text, size: 22, font: "Calibri", color: "1C3331" })],
  });
}

export async function generateDocxBuffer(): Promise<Buffer> {
  const children: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({ text: d.title, bold: true, size: 56, font: "Calibri", color: "0F766E" }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({ text: d.subtitle, bold: true, size: 28, font: "Calibri", color: "071413" }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 12, color: "FF5A36", space: 8 },
      },
      children: [
        new TextRun({ text: d.tagline, italics: true, size: 22, font: "Calibri", color: "5A716E" }),
      ],
    }),
    heading("Executive Promise"),
    ...d.intro.map((p) => body(p)),
    body(`Unique selling proposition: ${d.usp}`, { bold: true }),
    heading("How FieldGrow Helps Business Owners"),
    ...d.promise.map((p) => bullet(p)),
  ];

  for (const audience of d.audiences) {
    children.push(heading(audience.title, HeadingLevel.HEADING_2));
    audience.points.forEach((p) => children.push(bullet(p)));
  }

  children.push(heading("Core Field Management Features"));
  for (const feature of d.coreFeatures) {
    children.push(body(feature.name, { bold: true }));
    children.push(body(`Business impact: ${feature.help}`));
  }

  children.push(heading("Growth & Unique Features"));
  for (const feature of d.growthFeatures) {
    children.push(body(feature.name, { bold: true }));
    children.push(body(`Business impact: ${feature.help}`));
  }

  children.push(heading(`${d.usp} — The Story`));
  d.loopStory.forEach((step, i) => children.push(bullet(`${i + 1}. ${step}`)));

  children.push(heading("Problems We Eliminate"));
  d.problemsSolved.forEach((p) => children.push(bullet(p)));

  children.push(heading("Why Business Owners Choose FieldGrow"));
  d.closing.forEach((p) => children.push(body(p)));

  children.push(heading("Next Step"));
  children.push(body(d.contact.note));
  children.push(body(`Email: ${d.contact.email}`));
  children.push(body(`Phone: ${d.contact.phone}`));

  const doc = new Document({
    creator: "FieldGrow",
    title: "FieldGrow Business Pitch",
    description: "Product pitch for field service business owners",
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 864, right: 864 },
          },
        },
        children,
      },
    ],
  });

  return Packer.toBuffer(doc);
}