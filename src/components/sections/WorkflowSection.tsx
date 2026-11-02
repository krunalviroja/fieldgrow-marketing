"use client";

import { motion } from "framer-motion";
import { workflowSteps } from "@/lib/content";
import styles from "./WorkflowSection.module.scss";

export function WorkflowSection() {
  return (
    <section className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">How FieldGrow works</p>
          <h2 className="fg-title">From first request to repeat revenue</h2>
          <p className="fg-lead">
            Competitors stop at job completion. FieldGrow continues the loop so every service can
            create the next one.
          </p>
        </div>

        <div className={styles.track}>
          {workflowSteps.map((step, index) => (
            <motion.article
              key={step.step}
              className={styles.card}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.06 }}
            >
              <span>{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
