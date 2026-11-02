"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { brand, hero } from "@/lib/content";
import { Magnetic } from "@/components/ui/Magnetic";
import styles from "./Hero.module.scss";

const rotating = ["field team", "customer growth", "repeat revenue", "job profits"];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const visualRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex((v) => (v + 1) % rotating.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  function onMove(e: MouseEvent) {
    const el = visualRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.glow} aria-hidden />
      <div className={styles.orbs} aria-hidden>
        <span />
        <span />
      </div>

      <div className={`fg-container ${styles.grid}`}>
        <div className={styles.copy}>
          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <span className={styles.brandLine}>{brand.name}</span>
            {hero.title}
          </motion.h1>

          <motion.p
            className={styles.rotator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
          >
            Built for{" "}
            <span className={styles.wordWrap}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotating[wordIndex]}
                  className={styles.word}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {rotating[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Magnetic>
              <a className="fg-btn fg-btn--primary" href="#resources">
                {hero.primaryCta}
              </a>
            </Magnetic>
            <Magnetic strength={12}>
              <a className="fg-btn fg-btn--secondary" href="#simulator">
                Try revenue simulator
              </a>
            </Magnetic>
          </motion.div>

          <motion.p
            className={styles.note}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            No credit card required · Free / low-cost migration available
          </motion.p>
        </div>

        <motion.div
          ref={visualRef}
          className={styles.visual}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ perspective: 1200 }}
        >
          <motion.div className={styles.frame} style={{ rotateX: rx, rotateY: ry }}>
            <div className={styles.chrome}>
              <span />
              <span />
              <span />
              <em>fieldgrow.app / dashboard</em>
            </div>
            <img src="/images/dashboard-preview.jpg" alt="FieldGrow dashboard preview" />
          </motion.div>

          <motion.div
            className={styles.floatA}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <strong>Missed revenue</strong>
            <span>₹1,55,500 ready to recover</span>
          </motion.div>
          <motion.div
            className={styles.floatB}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <strong>Growth loop</strong>
            <span>Job → Review → Repeat booking</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
