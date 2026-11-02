"use client";

import { motion } from "framer-motion";
import { modules } from "@/lib/content";
import styles from "./ProductSection.module.scss";

const groups = [
  { title: "Admin", items: modules.admin, tone: "blue" },
  { title: "Technician", items: modules.technician, tone: "green" },
  { title: "Customer", items: modules.customer, tone: "warm" },
  { title: "Growth", items: modules.growth, tone: "blue" },
] as const;

export function ProductSection() {
  return (
    <section className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Product depth</p>
          <h2 className="fg-title">Everything your team needs — in one place</h2>
          <p className="fg-lead">
            Admin web & mobile, technician app, customer booking, and the growth layer most FSM
            tools leave blank.
          </p>
        </div>

        <div className={styles.grid}>
          {groups.map((group, index) => (
            <motion.article
              key={group.title}
              className={`${styles.card} ${styles[group.tone]}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
