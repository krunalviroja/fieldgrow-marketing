"use client";

import { motion } from "framer-motion";
import { brand, systemPillars } from "@/lib/content";
import styles from "./SystemSection.module.scss";

export function SystemSection() {
  return (
    <section id="system" className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">The system</p>
          <h2 className="fg-title">Not another field tracker. An operating system.</h2>
          <p className="fg-lead">
            Most FSM tools stop at job completion. {brand.name} asks a better question: how much
            more business can this completed job create?
          </p>
        </div>

        <div className={styles.grid}>
          {systemPillars.map((pillar, index) => (
            <motion.article
              key={pillar.id}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <span className={styles.index}>0{index + 1}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
