"use client";

import { motion } from "framer-motion";
import { industries, pitchBeats } from "@/lib/content";
import styles from "./IndustriesSection.module.scss";

export function IndustriesSection() {
  return (
    <section id="industries" className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Industries</p>
          <h2 className="fg-title">Built first for service businesses that live on repeat work.</h2>
        </div>

        <div className={styles.grid}>
          {industries.map((industry, index) => (
            <motion.article
              key={industry.name}
              className={styles.card}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{industry.name}</h3>
              <p>{industry.focus}</p>
            </motion.article>
          ))}
        </div>

        <div className={styles.pitch}>
          <h3>The sales conversation that lands</h3>
          <div className={styles.beats}>
            {pitchBeats.map((beat) => (
              <p key={beat}>{beat}</p>
            ))}
          </div>
          <p className={styles.close}>That&apos;s exactly what FieldGrow solves.</p>
        </div>
      </div>
    </section>
  );
}
