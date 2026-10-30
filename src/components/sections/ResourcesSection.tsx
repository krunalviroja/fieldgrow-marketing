"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import styles from "./ResourcesSection.module.scss";

async function downloadFile(format: "pdf" | "docx") {
  const res = await fetch(`/api/download/${format}`);
  if (!res.ok) {
    throw new Error("Download failed");
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = format === "pdf" ? "FieldGrow-Business-Pitch.pdf" : "FieldGrow-Business-Pitch.docx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function ResourcesSection() {
  const mutation = useMutation({
    mutationFn: downloadFile,
  });

  return (
    <section className={`fg-section ${styles.section}`} id="resources">
      <div className={`fg-container ${styles.panel}`}>
        <div>
          <p className="fg-eyebrow">Share with your team</p>
          <h2 className="fg-title">Download the FieldGrow pitch for business owners</h2>
          <p className="fg-lead">
            A professional PDF and DOCX you can forward to founders, operations managers, and
            partners — covering features, unique growth loops, and how FieldGrow helps manage and
            scale service businesses.
          </p>
          <div className={styles.actions}>
            <Button
              label="Download PDF"
              icon="pi pi-file-pdf"
              loading={mutation.isPending && mutation.variables === "pdf"}
              onClick={() => mutation.mutate("pdf")}
            />
            <Button
              label="Download DOCX"
              icon="pi pi-file-word"
              severity="secondary"
              outlined
              loading={mutation.isPending && mutation.variables === "docx"}
              onClick={() => mutation.mutate("docx")}
            />
            <a className="fg-btn fg-btn--ghost" href="/docs/FieldGrow-Business-Pitch.pdf" download>
              Direct PDF
            </a>
            <a className="fg-btn fg-btn--ghost" href="/docs/FieldGrow-Business-Pitch.docx" download>
              Direct DOCX
            </a>
          </div>
          {mutation.isError && (
            <p className={styles.error}>Could not generate the file. Please try again.</p>
          )}
          {mutation.isSuccess && (
            <p className={styles.ok}>Download started. Share it with decision makers.</p>
          )}
        </div>
        <div className={styles.ctaCard}>
          <h3>Ready to stop being the operating system?</h3>
          <p>
            Let FieldGrow run jobs, recover missed revenue, automate WhatsApp, and turn every service
            into the next booking.
          </p>
          <a className="fg-btn fg-btn--primary" href="mailto:hello@fieldgrow.app">
            Book a discovery call
          </a>
        </div>
      </div>
    </section>
  );
}