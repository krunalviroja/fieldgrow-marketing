import { brand, navLinks } from "@/lib/content";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`fg-container ${styles.grid}`}>
        <div className={styles.brandBlock}>
          <div className={styles.brand}>
            <span className={styles.mark}>{brand.mark}</span>
            <span>{brand.name}</span>
          </div>
          <p>{brand.promise}</p>
          <p className={styles.tag}>{brand.tagline}</p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href="#resources">Resources</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul>
            <li>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
            <li>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            </li>
            <li>
              <a href={brand.loginUrl}>Login</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`fg-container ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} {brand.name}. Service-to-Growth Engine™</span>
        <span>Built for Indian field service businesses</span>
      </div>
    </footer>
  );
}
