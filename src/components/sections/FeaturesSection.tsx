"use client";

import { motion } from "framer-motion";
import { featureBlocks } from "@/lib/content";
import styles from "./FeaturesSection.module.scss";

export function FeaturesSection() {
  return (
    <section id="features" className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Features</p>
          <h2 className="fg-title">More than job tracking — a complete service OS</h2>
          <p className="fg-lead">
            Marketing, sales, operations, billing, and growth in one field service platform — so you
            are not juggling WhatsApp, Excel, Tally, Maps, and five other tools.
          </p>
        </div>

        <div className={styles.list}>
          {featureBlocks.map((block, index) => (
            <motion.article
              key={block.title}
              className={`${styles.block} ${index % 2 === 1 ? styles.reverse : ""} ${styles[block.tone]}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <div className={styles.copy}>
                <p className={styles.eyebrow}>{block.eyebrow}</p>
                <h3>{block.title}</h3>
                <p>{block.copy}</p>
                <ul>
                  {block.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.media}>
                <img src={block.image} alt={block.title} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
