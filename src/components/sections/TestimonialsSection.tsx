"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/content";
import styles from "./TestimonialsSection.module.scss";

export function TestimonialsSection() {
  return (
    <section id="customers" className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Customer stories</p>
          <h2 className="fg-title">Hear from service businesses like yours</h2>
        </div>

        <div className={styles.grid}>
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <p className={styles.metric}>{item.metric}</p>
              <blockquote>“{item.quote}”</blockquote>
              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
