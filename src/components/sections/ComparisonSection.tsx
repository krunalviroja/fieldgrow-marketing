import { comparisonRows, modules } from "@/lib/content";
import styles from "./ComparisonSection.module.scss";

function Stars({ count }: { count: number }) {
  return (
    <span aria-label={`${count} out of 5`}>
      {"★".repeat(count)}
      <span style={{ opacity: 0.25 }}>{"★".repeat(5 - count)}</span>
    </span>
  );
}

export function ComparisonSection() {
  return (
    <section className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Positioning</p>
          <h2 className="fg-title">Where others stop at operations, we own growth.</h2>
        </div>

        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Capability</th>
                <th>Traditional FSM</th>
                <th>Field-force tools</th>
                <th>ERP</th>
                <th>CRM</th>
                <th>FieldGrow</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.capability}>
                  <td>{row.capability}</td>
                  <td>
                    <Stars count={row.traditional} />
                  </td>
                  <td>
                    <Stars count={row.fieldForce} />
                  </td>
                  <td>
                    <Stars count={row.erp} />
                  </td>
                  <td>
                    <Stars count={row.crm} />
                  </td>
                  <td className={styles.highlight}>
                    <Stars count={row.fieldgrow} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.modules}>
          <div>
            <h3>Core field system</h3>
            <ul>
              {modules.core.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Growth engine</h3>
            <ul>
              {modules.growth.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}