"use client";

import { useMutation } from "@tanstack/react-query";
import { brand } from "@/lib/content";
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
          <p className="fg-eyebrow">Resources</p>
          <h2 className="fg-title">Take the FieldGrow story into the room.</h2>
          <p className="fg-lead">
            Download a CEO-ready pitch covering the Service-to-Growth Engine™, product depth,
            problems we solve, and how migration works from WhatsApp + Excel chaos.
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className="fg-btn fg-btn--primary"
              disabled={mutation.isPending}
              onClick={() => mutation.mutate("pdf")}
            >
              {mutation.isPending && mutation.variables === "pdf" ? "Preparing PDF…" : "Download PDF"}
            </button>
            <button
              type="button"
              className="fg-btn fg-btn--secondary"
              disabled={mutation.isPending}
              onClick={() => mutation.mutate("docx")}
            >
              {mutation.isPending && mutation.variables === "docx"
                ? "Preparing DOCX…"
                : "Download DOCX"}
            </button>
            <a className="fg-btn fg-btn--dark" href="/docs/FieldGrow-Business-Pitch.pdf" download>
              Direct PDF
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
            into the next booking — including free or low-cost migration.
          </p>
          <a className="fg-btn fg-btn--primary" href={`mailto:${brand.email}`}>
            Book a discovery call
          </a>
        </div>
      </div>
    </section>
  );
}
