"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { problems } from "@/lib/content";
import styles from "./ProblemSection.module.scss";

export function ProblemSection() {
  const [active, setActive] = useState(0);
  const item = problems[active];

  return (
    <section id="problems" className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Problems we solve</p>
          <h2 className="fg-title">The chaos behind WhatsApp + Excel + Tally.</h2>
          <p className="fg-lead">
            Individually those tools work. Together they are not a system. FieldGrow replaces the
            owner-as-operating-system with software that owns the loop.
          </p>
        </div>

        <div className={styles.theater}>
          <div className={styles.list} role="tablist" aria-label="Problems">
            {problems.map((problem, index) => (
              <button
                key={problem.num}
                type="button"
                role="tab"
                aria-selected={index === active}
                className={index === active ? styles.on : undefined}
                onClick={() => setActive(index)}
              >
                <span>{problem.num}</span>
                {problem.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={item.num}
              className={styles.detail}
              role="tabpanel"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
            >
              <p className={styles.num}>{item.num}</p>
              <h3>{item.title}</h3>
              <div className={styles.pair}>
                <div>
                  <p className={styles.label}>Today</p>
                  <p>{item.pain}</p>
                </div>
                <div>
                  <p className={styles.label}>With FieldGrow</p>
                  <p className={styles.fix}>{item.fix}</p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
