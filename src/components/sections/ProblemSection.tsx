"use client";

import { motion } from "framer-motion";
import { problems } from "@/lib/content";
import styles from "./ProblemSection.module.scss";

export function ProblemSection() {
  return (
    <section id="problems" className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Problems we solve</p>
          <h2 className="fg-title">WhatsApp + Excel + Tally is not a system</h2>
          <p className="fg-lead">
            Individually those tools work. Together they create chaos. FieldGrow replaces
            owner-as-operating-system with software that owns the full loop.
          </p>
        </div>

        <div className={styles.grid}>
          {problems.map((problem, index) => (
            <motion.article
              key={problem.title}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{problem.title}</h3>
              <p className={styles.pain}>{problem.pain}</p>
              <p className={styles.fix}>{problem.fix}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
