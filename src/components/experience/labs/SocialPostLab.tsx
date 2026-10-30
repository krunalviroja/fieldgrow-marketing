"use client";

import { useState, useTransition } from "react";
import { Button } from "primereact/button";
import { useExperience } from "@/context/ExperienceContext";
import styles from "../ExperienceLab.module.scss";

const services = ["AC Service", "AC Installation", "CCTV Repair", "Pest Control"];

export function SocialPostLab() {
  const { businessName, setBusinessName, markComplete } = useExperience();
  const [service, setService] = useState(services[0]);
  const [city, setCity] = useState("Ahmedabad");
  const [post, setPost] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const generate = () => {
    startTransition(() => {
      const emoji = service.includes("AC") ? "❄️" : service.includes("CCTV") ? "📹" : "✨";
      setPost(
        `${emoji} Another ${service.toLowerCase()} completed successfully by ${businessName}.\n\nNeed ${service} in ${city}? Book in 60 seconds on WhatsApp or our website.\n\n⭐ Trusted local service | Same-day slots available\n#${city.replace(/\s/g, "")} #${service.replace(/\s/g, "")} #FieldGrow`,
      );
      markComplete("social");
    });
  };

  return (
    <div className={styles.demoCard}>
      <h3>Generate a social post from a completed job</h3>
      <p>Feel the growth loop: finish a job → publish proof → attract the next booking.</p>

      <div className={styles.field}>
        <label htmlFor="biz">Business name</label>
        <input
          id="biz"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.field} style={{ flex: 1 }}>
          <label htmlFor="service">Completed service</label>
          <select id="service" value={service} onChange={(e) => setService(e.target.value)}>
            {services.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className={styles.field} style={{ flex: 1 }}>
          <label htmlFor="city">City</label>
          <input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
      </div>

      <Button
        label={pending ? "Generating…" : "Generate post in 1 click"}
        icon="pi pi-sparkles"
        onClick={generate}
        loading={pending}
      />

      {post && (
        <div className={styles.postPreview}>
          <img src="/images/before-after-service.jpg" alt="Before and after service visual" />
          <div className={styles.caption}>
            <strong>Ready for Instagram / WhatsApp Status</strong>
            <pre style={{ whiteSpace: "pre-wrap", margin: 0, fontFamily: "inherit" }}>{post}</pre>
          </div>
        </div>
      )}
    </div>
  );
}