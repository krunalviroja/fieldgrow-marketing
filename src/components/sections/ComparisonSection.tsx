"use client";

import { comparisonRows } from "@/lib/content";
import styles from "./ComparisonSection.module.scss";

function Dots({ count, highlight = false }: { count: number; highlight?: boolean }) {
  return (
    <span className={`${styles.dots} ${highlight ? styles.hi : ""}`} aria-label={`${count} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={i < count ? styles.filled : undefined} />
      ))}
    </span>
  );
}

export function ComparisonSection() {
  return (
    <section className={`fg-section ${styles.section}`} id="compare">
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Positioning</p>
          <h2 className="fg-title">Where the market is empty.</h2>
          <p className="fg-lead">
            Traditional FSM and field-force tools win on operations. FieldGrow wins the growth
            column they leave blank.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Capability</th>
                <th>Traditional FSM</th>
                <th>Field Force</th>
                <th>ERP</th>
                <th>CRM</th>
                <th className={styles.fgCol}>FieldGrow</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.capability}>
                  <td>{row.capability}</td>
                  <td>
                    <Dots count={row.traditional} />
                  </td>
                  <td>
                    <Dots count={row.fieldForce} />
                  </td>
                  <td>
                    <Dots count={row.erp} />
                  </td>
                  <td>
                    <Dots count={row.crm} />
                  </td>
                  <td className={styles.fgCol}>
                    <Dots count={row.fieldgrow} highlight />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
