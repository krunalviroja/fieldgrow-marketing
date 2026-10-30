"use client";

import { brand, heroStats } from "@/lib/content";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={`fg-container ${styles.stage}`}>
        <div className={styles.copy}>
          <p className="fg-eyebrow">
            <span className={styles.dot} />
            {brand.usp}
          </p>
          <h1 className={styles.brandTitle}>{brand.name}</h1>
          <p className={styles.promise}>{brand.promise}</p>
          <p className={styles.tagline}>{brand.tagline}</p>
          <div className={styles.actions}>
            <a className="fg-btn fg-btn--primary" href="#experience">
              Try the Experience Lab
              <i className="pi pi-arrow-right" />
            </a>
            <a className="fg-btn fg-btn--secondary" href="#resources">
              Download PDF & DOCX
            </a>
          </div>
          <div className={styles.stats}>
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visual} aria-hidden={false}>
          <div className={styles.mediaFrame}>
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
            <img
              className={styles.fallback}
              src="/images/hero-fieldgrow.jpg"
              alt="FieldGrow helping field teams and business owners grow together"
            />
          </div>
          <aside className={`${styles.floatCard} ${styles.floatLeft}`}>
            <span>Missed Revenue</span>
            <strong>₹1,55,500</strong>
            <em>Ready to recover</em>
          </aside>
          <aside className={`${styles.floatCard} ${styles.floatRight}`}>
            <span>Live loop</span>
            <strong>Service → Growth</strong>
            <em>Job just created a campaign</em>
          </aside>
        </div>
      </div>
    </section>
  );
}