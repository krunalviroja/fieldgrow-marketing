"use client";

import { useMutation } from "@tanstack/react-query";
import { brand } from "@/lib/content";
import styles from "./ResourcesSection.module.scss";

async function downloadFile(format: "pdf" | "docx") {
  const res = await fetch(`/api/download/${format}`);
  if (!res.ok) throw new Error("Download failed");
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
  const mutation = useMutation({ mutationFn: downloadFile });

  return (
    <section className={`fg-section ${styles.section}`} id="resources">
      <div className={`fg-container ${styles.banner}`}>
        <div>
          <p className="fg-eyebrow">Get started</p>
          <h2>You&apos;ve got this — and we&apos;ve got your back</h2>
          <p>
            Start a free trial, book a demo, or download the FieldGrow pitch for your leadership
            team. Migration from WhatsApp + Excel is free or low-cost.
          </p>
          <div className={styles.actions}>
            <a className="fg-btn fg-btn--primary" href={`mailto:${brand.email}`}>
              Start free trial
            </a>
            <a className="fg-btn fg-btn--secondary" href={`mailto:${brand.email}`}>
              Book a demo
            </a>
            <button
              type="button"
              className="fg-btn fg-btn--ghost"
              disabled={mutation.isPending}
              onClick={() => mutation.mutate("pdf")}
            >
              {mutation.isPending && mutation.variables === "pdf" ? "Preparing…" : "Download PDF"}
            </button>
            <button
              type="button"
              className="fg-btn fg-btn--ghost"
              disabled={mutation.isPending}
              onClick={() => mutation.mutate("docx")}
            >
              {mutation.isPending && mutation.variables === "docx" ? "Preparing…" : "Download DOCX"}
            </button>
          </div>
          {mutation.isError && <p className={styles.error}>Could not generate the file. Try again.</p>}
          {mutation.isSuccess && <p className={styles.ok}>Download started.</p>}
        </div>
        <div className={styles.aside}>
          <h3>Talk to sales</h3>
          <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <p>No credit card required for trial access.</p>
        </div>
      </div>
    </section>
  );
}
