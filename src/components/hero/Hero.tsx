"use client";

import { motion } from "framer-motion";
import { brand, heroLines } from "@/lib/content";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.media} aria-hidden>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-fieldgrow.jpg"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className={styles.veil} />
        <div className={styles.grain} />
      </div>

      <div className={`fg-container ${styles.content}`}>
        <motion.p
          className={styles.usp}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {brand.usp}
        </motion.p>

        <motion.h1
          className={styles.brand}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          {heroLines.brand}
        </motion.h1>

        <motion.p
          className={styles.headline}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
        >
          {heroLines.headline}
        </motion.p>

        <motion.p
          className={styles.support}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          {heroLines.support}
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
        >
          <a className="fg-btn fg-btn--primary" href="#experience">
            Enter the Experience Lab
          </a>
          <a className="fg-btn fg-btn--ghost" href="#loop">
            See the Growth Loop
          </a>
        </motion.div>
      </div>

      <div className={styles.scrollHint} aria-hidden>
        <span>Scroll the system</span>
        <i />
      </div>
    </section>
  );
}
