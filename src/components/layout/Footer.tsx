import { brand, navLinks } from "@/lib/content";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`fg-container ${styles.top}`}>
        <div className={styles.brandBlock}>
          <div className={styles.brand}>
            <span className={styles.mark}>{brand.mark}</span>
            <span>{brand.name}</span>
          </div>
          <p>{brand.promise}</p>
          <p className={styles.tag}>{brand.tagline}</p>
        </div>

        <div className={styles.col}>
          <h3>Product</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3>Company</h3>
          <ul>
            <li>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
            <li>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            </li>
            <li>
              <a href="#resources">Start free trial</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`fg-container ${styles.bottom}`}>
        <span>
          © {new Date().getFullYear()} {brand.name}. Service-to-Growth Engine™
        </span>
        <span>Built for growing service businesses</span>
      </div>
    </footer>
  );
}
