"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/content";
import styles from "./IndustriesSection.module.scss";

export function IndustriesSection() {
  return (
    <section id="industries" className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Industries</p>
          <h2 className="fg-title">Proud partner to service pros across trades</h2>
          <p className="fg-lead">
            Built first for businesses with technicians, recurring work, WhatsApp-heavy customers,
            and Google review growth.
          </p>
        </div>

        <div className={styles.grid}>
          {industries.map((industry, index) => (
            <motion.article
              key={industry.name}
              className={styles.card}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <h3>{industry.name}</h3>
              <p>{industry.focus}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
