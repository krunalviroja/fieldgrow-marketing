"use client";

import { useState, useTransition } from "react";
import { Button } from "primereact/button";
import { useExperience } from "@/context/ExperienceContext";
import styles from "../ExperienceLab.module.scss";

const templates = [
  { id: "trust", name: "Trust Pro", vibe: "Ratings + booking first" },
  { id: "proof", name: "Proof Gallery", vibe: "Before/after heavy" },
  { id: "local", name: "Local Hero", vibe: "Service areas focus" },
];

export function WebsiteDeployLab() {
  const { businessName, markComplete } = useExperience();
  const [template, setTemplate] = useState(templates[0].id);
  const [domain, setDomain] = useState("abcacservices.com");
  const [deployed, setDeployed] = useState(false);
  const [pending, startTransition] = useTransition();

  const deploy = () => {
    startTransition(() => {
      setDeployed(true);
      markComplete("website");
    });
  };

  const active = templates.find((t) => t.id === template)!;

  return (
    <div className={styles.demoCard}>
      <h3>Build & deploy your business website</h3>
      <p>Select a template, preview the live site feel, then deploy to your custom domain.</p>

      <div className={styles.templateGrid}>
        {templates.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.template} ${template === item.id ? styles.templateActive : ""}`}
            onClick={() => {
              setTemplate(item.id);
              setDeployed(false);
            }}
          >
            <strong>{item.name}</strong>
            <span>{item.vibe}</span>
          </button>
        ))}
      </div>

      <div className={styles.field} style={{ marginTop: "1rem" }}>
        <label htmlFor="domain">Custom domain</label>
        <input id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
      </div>

      <Button
        label={pending ? "Deploying…" : "Deploy website in 1 click"}
        icon="pi pi-cloud-upload"
        onClick={deploy}
        loading={pending}
      />

      <div className={styles.sitePreview}>
        <div className={styles.chrome}>
          <i className="pi pi-globe" />
          {domain || "yourbusiness.com"}
        </div>
        <img src="/images/portfolio-website.jpg" alt="Portfolio website preview" />
        <div className={styles.siteBody}>
          <h4 style={{ margin: "0 0 0.35rem", fontFamily: "var(--font-display)" }}>
            {businessName}
          </h4>
          <p style={{ marginBottom: "0.6rem" }}>
            Template: {active.name} · ⭐ 4.8/5 · Book a Service
          </p>
          <p>Services · Recent work · Reviews · Areas: Ahmedabad, Gandhinagar, Bopal</p>
        </div>
      </div>

      {deployed && (
        <div className={styles.successToast}>
          Deployed to https://{domain} — booking + reviews syncing from FieldGrow.
        </div>
      )}
    </div>
  );
}