"use client";

import { motion } from "framer-motion";
import { trustStats } from "@/lib/content";
import { CountUp } from "@/components/ui/CountUp";
import styles from "./TrustSection.module.scss";

export function TrustSection() {
  return (
    <section className={styles.section} aria-label="Trust metrics">
      <div className={`fg-container ${styles.grid}`}>
        {trustStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={styles.item}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.07 }}
          >
            <strong>
              <CountUp value={stat.value} />
            </strong>
            <span>{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
