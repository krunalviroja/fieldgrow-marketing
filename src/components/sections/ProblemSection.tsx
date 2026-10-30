import { problems } from "@/lib/content";
import styles from "./ProblemSection.module.scss";

export function ProblemSection() {
  return (
    <section className={`fg-section ${styles.section}`} id="problems">
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">The real problems</p>
          <h2 className="fg-title">Your tools work. Your system doesn&apos;t.</h2>
          <p className="fg-lead">
            WhatsApp + Excel + Tally + Google Maps + UPI can keep a service business alive —
            but they can&apos;t run it. FieldGrow replaces chaos with one operating loop.
          </p>
        </div>
        <div className={styles.grid}>
          {problems.map((item, index) => (
            <article key={item.title} className={styles.card}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p className={styles.pain}>{item.pain}</p>
              <p className={styles.fix}>
                <strong>FieldGrow:</strong> {item.fix}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}