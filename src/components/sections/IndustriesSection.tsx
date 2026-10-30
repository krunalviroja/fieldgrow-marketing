import { industries } from "@/lib/content";
import styles from "./IndustriesSection.module.scss";

export function IndustriesSection() {
  return (
    <section className={`fg-section ${styles.section}`} id="industries">
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Built for service businesses</p>
          <h2 className="fg-title">Start sharp. Expand later.</h2>
          <p className="fg-lead">
            We begin with verticals that already live on WhatsApp, AMC, technician visits, and Google
            reviews — perfect for the Service-to-Growth Engine™.
          </p>
        </div>
        <div className={styles.grid}>
          {industries.map((item) => (
            <article key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.focus}</p>
            </article>
          ))}
        </div>
        <div className={styles.offline}>
          <img src="/images/technician-mobile.jpg" alt="Technician using FieldGrow mobile offline" />
          <div>
            <h3>Offline-first for Indian field reality</h3>
            <p>
              Basements, industrial zones, rural routes — jobs, photos, checklists, and signatures
              save locally and sync automatically when network returns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}