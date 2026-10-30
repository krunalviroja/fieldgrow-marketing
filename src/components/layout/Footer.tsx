import { brand } from "@/lib/content";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`fg-container ${styles.grid}`}>
        <div>
          <div className={styles.brand}>
            <span className={styles.mark}>FG</span>
            <strong>{brand.name}</strong>
          </div>
          <p>{brand.promise}</p>
        </div>
        <div>
          <h4>Product</h4>
          <a href="#experience">Try the Experience Lab</a>
          <a href="#growth-loop">{brand.usp}</a>
          <a href="#resources">Download PDF / DOCX</a>
        </div>
        <div>
          <h4>Talk to us</h4>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
        </div>
      </div>
      <div className={`fg-container ${styles.copy}`}>
        <span>© {new Date().getFullYear()} {brand.name}. Built for Indian field service businesses.</span>
      </div>
    </footer>
  );
}