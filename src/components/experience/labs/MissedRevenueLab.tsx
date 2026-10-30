"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { useExperience } from "@/context/ExperienceContext";
import styles from "../ExperienceLab.module.scss";

const opportunities = [
  { id: "amc", title: "12 AMC renewals due", amount: "₹54,000", action: "Send renewal offers" },
  { id: "dormant", title: "8 customers haven't returned", amount: "₹31,500", action: "Launch reactivation" },
  { id: "quotes", title: "6 quotations not accepted", amount: "₹42,000", action: "Follow up now" },
  { id: "maint", title: "17 customers due for maintenance", amount: "₹28,000", action: "Create WhatsApp campaign" },
];

export function MissedRevenueLab() {
  const { markComplete } = useExperience();
  const [done, setDone] = useState<string[]>([]);

  const act = (id: string) => {
    setDone((prev) => (prev.includes(id) ? prev : [...prev, id]));
    markComplete("revenue");
  };

  const total = "₹1,55,500";

  return (
    <div className={styles.demoCard}>
      <h3>Missed Revenue cockpit</h3>
      <p>
        Owners don&apos;t need “15 employees online.” They need to see money waiting to be recovered.
      </p>

      <div className={styles.nba} style={{ marginBottom: "1rem" }}>
        <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>{total}</strong>
        <div>Total potential revenue ready for action</div>
      </div>

      <div className={styles.opps}>
        {opportunities.map((item) => (
          <div key={item.id} className={styles.opp}>
            <div>
              <strong>{item.title}</strong>
              <span>{item.amount} potential</span>
            </div>
            <Button
              label={done.includes(item.id) ? "Queued" : item.action}
              size="small"
              severity={done.includes(item.id) ? "success" : undefined}
              onClick={() => act(item.id)}
            />
          </div>
        ))}
      </div>

      {done.length > 0 && (
        <div className={styles.successToast}>
          {done.length} action{done.length > 1 ? "s" : ""} queued — FieldGrow turns software into a
          revenue tool.
        </div>
      )}
    </div>
  );
}