"use client";

import { useEffect, useState } from "react";
import { brand, growthSteps } from "@/lib/content";
import styles from "./GrowthLoopSection.module.scss";

export function GrowthLoopSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % growthSteps.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className={`fg-section ${styles.section}`} id="growth-loop">
      <div className={`fg-container ${styles.layout}`}>
        <div>
          <p className="fg-eyebrow">Our USP</p>
          <h2 className="fg-title">{brand.usp}</h2>
          <p className="fg-lead">
            Most FSM software asks: “Did you complete the job?” FieldGrow asks: “How much more
            business can we generate from this completed job?”
          </p>
          <div className={styles.visual}>
            <img src="/images/growth-loop.jpg" alt="Service to growth loop visualization" />
          </div>
        </div>

        <ol className={styles.steps}>
          {growthSteps.map((step, index) => (
            <li
              key={step.id}
              className={index === active ? styles.active : ""}
              onMouseEnter={() => setActive(index)}
            >
              <button type="button" onClick={() => setActive(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{step.label}</strong>
                  <p>{step.detail}</p>
                </div>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}