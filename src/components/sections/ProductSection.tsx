"use client";

import { motion } from "framer-motion";
import { coreModules, growthModules } from "@/lib/content";
import styles from "./ProductSection.module.scss";

export function ProductSection() {
  return (
    <section id="product" className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Product depth</p>
          <h2 className="fg-title">Everything the field needs. Then the growth layer.</h2>
          <p className="fg-lead">
            Admin, technician, and customer experiences for day-to-day operations — plus a growth
            engine that turns completed work into reputation, packages, and repeat revenue.
          </p>
        </div>

        <div className={styles.core}>
          {coreModules.map((mod, index) => (
            <motion.article
              key={mod.role}
              className={styles.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.07 }}
            >
              <h3>{mod.role}</h3>
              <ul>
                {mod.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className={styles.growthHead}>
          <h3>Growth Engine</h3>
          <p>The differentiator most FSM products leave blank.</p>
        </div>

        <div className={styles.growthGrid}>
          {growthModules.map((mod, index) => (
            <motion.article
              key={mod.name}
              className={styles.growthCard}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.05 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h4>{mod.name}</h4>
              <p>{mod.help}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
