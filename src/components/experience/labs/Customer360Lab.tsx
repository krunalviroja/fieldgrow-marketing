"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { useExperience } from "@/context/ExperienceContext";
import { industryProfiles } from "@/lib/content";
import styles from "../ExperienceLab.module.scss";

export function Customer360Lab() {
  const { markComplete, industry } = useExperience();
  const profile = industryProfiles[industry];
  const [sent, setSent] = useState(false);

  return (
    <div className={styles.demoCard}>
      <h3>Customer 360 that answers “what next?”</h3>
      <p>Not another boring CRM screen — a decision surface for the owner.</p>

      <div className={styles.customer}>
        <div>
          <h4 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>
            {profile.customer}
          </h4>
          <span style={{ color: "var(--fg-muted)", fontSize: "0.9rem" }}>Customer since 2024</span>
        </div>

        <div className={styles.metricRow}>
          <div className={styles.metric}>
            <strong>₹72,400</strong>
            <span>Lifetime revenue</span>
          </div>
          <div className={styles.metric}>
            <strong>14</strong>
            <span>Total jobs</span>
          </div>
          <div className={styles.metric}>
            <strong>₹5,171</strong>
            <span>Avg job value</span>
          </div>
          <div className={styles.metric}>
            <strong>4.8⭐</strong>
            <span>Avg rating</span>
          </div>
        </div>

        <div>
          <strong>Services:</strong> {profile.service} · Repeat visits · Repair · {profile.nextService}
        </div>
        <div>
          <strong>Assets:</strong> Asset #1 · Asset #2 · Asset #3
        </div>

        <div className={styles.nba}>
          <div style={{ fontWeight: 800, marginBottom: "0.35rem" }}>Next Best Action</div>
          <p style={{ marginBottom: "0.8rem", color: "var(--fg-ink-soft)" }}>
             {profile.nextService} due in 21 days — send {profile.price} package before the customer goes cold.
          </p>
          <Button
            label={sent ? "Offer sent on WhatsApp" : "Send Offer"}
            icon="pi pi-send"
            onClick={() => {
              setSent(true);
              markComplete("customer360");
            }}
          />
        </div>
      </div>
    </div>
  );
}
