"use client";

import { useEffect, useState } from "react";
import { brand, navLinks } from "@/lib/content";
import styles from "./Header.module.scss";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`fg-container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label={brand.name}>
          <span className={styles.mark} aria-hidden>
            FG
          </span>
          <span className={styles.name}>{brand.name}</span>
        </a>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`} aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="fg-btn fg-btn--primary" href="#resources" onClick={() => setOpen(false)}>
            Download Pitch Deck
          </a>
        </nav>

        <button
          className={styles.menu}
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`pi ${open ? "pi-times" : "pi-bars"}`} />
        </button>
      </div>
    </header>
  );
}