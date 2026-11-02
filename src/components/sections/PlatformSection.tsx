"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { platformTabs } from "@/lib/content";
import styles from "./PlatformSection.module.scss";

export function PlatformSection() {
  const [active, setActive] = useState(0);
  const tab = platformTabs[active];

  return (
    <section id="platform" className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">All-in-one platform</p>
          <h2 className="fg-title">Built for how service businesses actually work</h2>
          <p className="fg-lead">
            From the first enquiry to the final payment — and the next booking after that. FieldGrow
            connects operations, field teams, billing, and growth.
          </p>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Platform areas">
          {platformTabs.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={index === active ? styles.on : undefined}
              onClick={() => setActive(index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            className={styles.panel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <div>
              <h3>{tab.title}</h3>
              <p>{tab.copy}</p>
              <ul>
                {tab.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a className="fg-btn fg-btn--ghost" href="#features">
                Explore features
              </a>
            </div>
            <div className={styles.media}>
              <img src={tab.image} alt={tab.title} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
