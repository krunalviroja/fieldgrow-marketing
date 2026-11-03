"use client";

import { brand } from "@/lib/content";
import styles from "./ResourcesSection.module.scss";

export function ResourcesSection() {
  return (
    <section className={`fg-section ${styles.section}`} id="resources">
      <div className={`fg-container ${styles.banner}`}>
        <div>
          <p className="fg-eyebrow">Get started</p>
          <h2>You&apos;ve got this — and we&apos;ve got your back</h2>
          <p>
             Start a free trial, book a demo, or download the complete FieldGrow customer guide.
             Migration from WhatsApp + Excel is free or low-cost.
          </p>
          <div className={styles.actions}>
            <a className="fg-btn fg-btn--primary" href={`mailto:${brand.email}`}>
              Start free trial
            </a>
            <a className="fg-btn fg-btn--secondary" href={`mailto:${brand.email}`}>
              Book a demo
            </a>
            <a
              className="fg-btn fg-btn--primary"
              href="/docs/FieldGrow_Complete_Customer_Product_Guide.pdf"
              download
            >
              Download Product Guide PDF
            </a>
            <a
              className="fg-btn fg-btn--secondary"
              href="/docs/FieldGrow_Complete_Customer_Product_Guide.docx"
              download
            >
              Download Product Guide DOCX
            </a>
          </div>
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
