"use client";

import { useEffect, useState } from "react";
import { brand, navLinks } from "@/lib/content";
import { useExperience } from "@/context/ExperienceContext";
import styles from "./Header.module.scss";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { industry, setIndustry } = useExperience();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`fg-container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label={brand.name}>
          <span className={styles.mark} aria-hidden>
            {brand.mark}
          </span>
          <span className={styles.name}>{brand.name}</span>
        </a>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`} aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className={styles.actions}>
            <label className={styles.industrySelect}>
              <span className="sr-only">Choose industry</span>
              <select value={industry} onChange={(event) => setIndustry(event.target.value as typeof industry)}>
                <option value="ac">AC / HVAC</option>
                <option value="cctv">CCTV / Security</option>
                <option value="pest">Pest Control</option>
                <option value="electrical">Electrical / Plumbing</option>
              </select>
            </label>
            <a className="fg-btn fg-btn--primary" href="#resources" onClick={() => setOpen(false)}>
              Try live demo
            </a>
          </div>
        </nav>

        <div className={styles.mobileBar}>
          <button
            type="button"
            className={styles.menu}
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
