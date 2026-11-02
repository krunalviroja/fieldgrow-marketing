"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { growthLoop, missedRevenueDemo } from "@/lib/content";
import styles from "./GrowthLoopSection.module.scss";

export function GrowthLoopSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = growthLoop[active];
  const progress = ((active + 1) / growthLoop.length) * 100;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % growthLoop.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section id="growth" className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Service-to-Growth Engine™</p>
          <h2 className="fg-title">Our edge: every finished job creates the next one</h2>
          <p className="fg-lead">
            Traditional FSM asks “Did you complete the job?” FieldGrow asks “How much more business
            can this completed job generate?”
          </p>
        </div>

        <div
          className={styles.layout}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={styles.steps}>
            <div className={styles.progressTrack} aria-hidden>
              <motion.div className={styles.progressFill} animate={{ width: `${progress}%` }} />
            </div>
            {growthLoop.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === active ? styles.on : undefined}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
              </button>
            ))}
          </div>

          <div className={styles.stage}>
            <svg className={styles.ring} viewBox="0 0 200 200" aria-hidden>
              <circle cx="100" cy="100" r="78" className={styles.ringBg} />
              <motion.circle
                cx="100"
                cy="100"
                r="78"
                className={styles.ringFg}
                style={{ pathLength: 1 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: (active + 1) / growthLoop.length }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
              {growthLoop.map((_, index) => {
                const angle = ((360 / growthLoop.length) * index - 90) * (Math.PI / 180);
                const x = 100 + Math.cos(angle) * 78;
                const y = 100 + Math.sin(angle) * 78;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={index === active ? 6 : 4}
                    className={index === active ? styles.nodeOn : styles.node}
                  />
                );
              })}
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                className={styles.detail}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.28 }}
              >
                <h3>{step.label}</h3>
                <p>{step.detail}</p>
                <div className={styles.revenue}>
                  <p className={styles.label}>Missed revenue snapshot</p>
                  <strong>₹1,55,500</strong>
                  <ul>
                    {missedRevenueDemo.map((row) => (
                      <li key={row.label}>
                        <span>{row.label}</span>
                        <em>{row.value}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
