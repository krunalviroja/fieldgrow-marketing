"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./LiveOpsFeed.module.scss";

const events = [
  { city: "Ahmedabad", text: "AC service completed → review request sent" },
  { city: "Surat", text: "WhatsApp booking confirmed for 1:00 PM" },
  { city: "Pune", text: "₹42,000 quotation follow-up launched" },
  { city: "Jaipur", text: "Technician Rahul checked in offline → synced" },
  { city: "Indore", text: "AMC renewal offer sent to 12 customers" },
  { city: "Bengaluru", text: "Job profit calculated: 51% margin" },
  { city: "Hyderabad", text: "Google review received · 5★" },
  { city: "Chennai", text: "Missed revenue alert: ₹28,000 due maintenance" },
];

export function LiveOpsFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % events.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const item = events[index];

  return (
    <section className={styles.feed} aria-label="Live operations across FieldGrow">
      <div className={`fg-container ${styles.inner}`}>
        <div className={styles.live}>
          <i />
          Live across FieldGrow
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={item.text}
            className={styles.event}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <strong>{item.city}</strong>
            <span>{item.text}</span>
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
