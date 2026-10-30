import { NextRequest, NextResponse } from "next/server";
import { generateDocxBuffer } from "@/lib/generateDocx";
import { generatePdfBuffer } from "@/lib/generatePdf";

type Format = "pdf" | "docx";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ format: string }> },
) {
  const { format } = await context.params;

  if (format !== "pdf" && format !== "docx") {
    return NextResponse.json({ error: "Unsupported format" }, { status: 400 });
  }

  try {
    if ((format as Format) === "pdf") {
      const buffer = await generatePdfBuffer();
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="FieldGrow-Business-Pitch.pdf"',
          "Cache-Control": "no-store",
        },
      });
    }

    const buffer = await generateDocxBuffer();
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="FieldGrow-Business-Pitch.docx"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate document" }, { status: 500 });
  }
}