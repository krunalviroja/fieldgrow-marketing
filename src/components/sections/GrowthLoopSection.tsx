"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { growthSteps } from "@/lib/content";
import styles from "./GrowthLoopSection.module.scss";

export function GrowthLoopSection() {
  const [active, setActive] = useState(0);
  const step = growthSteps[active];

  return (
    <section id="loop" className={styles.section}>
      <div className={`fg-container ${styles.wrap}`}>
        <div className={styles.copy}>
          <p className="fg-eyebrow">Service-to-Growth Engine™</p>
          <h2 className="fg-title">Every finished job becomes a growth asset.</h2>
          <p className="fg-lead">
            Traditional FSM asks: did you complete the job? FieldGrow asks: how much more business
            can we generate from this completed job?
          </p>

          <ol className={styles.steps}>
            {growthSteps.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={index === active ? styles.active : undefined}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.stage} aria-live="polite">
          <div className={styles.orbit} aria-hidden>
            {growthSteps.map((item, index) => {
              const angle = (360 / growthSteps.length) * index - 90;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.node} ${index === active ? styles.nodeActive : ""}`}
                  style={{ "--angle": `${angle}deg` } as CSSProperties}
                  onClick={() => setActive(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <div className={styles.ring} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              className={styles.panel}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <p className={styles.kicker}>Loop stage</p>
              <h3>{step.label}</h3>
              <p>{step.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
