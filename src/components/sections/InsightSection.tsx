"use client";

import { motion } from "framer-motion";
import { customer360Demo, missedRevenueDemo, profitDemo } from "@/lib/content";
import styles from "./InsightSection.module.scss";

export function InsightSection() {
  return (
    <section className={`fg-section ${styles.section}`} id="insights">
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Owner clarity</p>
          <h2 className="fg-title">Dashboards that answer “what should I do next?”</h2>
        </div>

        <div className={styles.grid}>
          <motion.article
            className={styles.customer}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.cardTop}>
              <div>
                <h3>{customer360Demo.name}</h3>
                <p>{customer360Demo.since}</p>
              </div>
              <span>Customer 360</span>
            </div>

            <div className={styles.metrics}>
              {customer360Demo.metrics.map((m) => (
                <div key={m.label}>
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.split}>
              <div>
                <p className={styles.label}>Services</p>
                <ul>
                  {customer360Demo.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.label}>Assets</p>
                <ul>
                  {customer360Demo.assets.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.next}>
              <div>
                <p className={styles.label}>Next best action</p>
                <p className={styles.nextText}>{customer360Demo.nextAction}</p>
              </div>
              <button type="button" className="fg-btn fg-btn--primary">
                Send Offer
              </button>
            </div>
          </motion.article>

          <div className={styles.side}>
            <motion.article
              className={styles.revenue}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
            >
              <p className={styles.label}>Missed revenue</p>
              <h3>₹1,55,500</h3>
              <p className={styles.sub}>Ready to recover</p>
              <ul>
                {missedRevenueDemo.map((row) => (
                  <li key={row.label}>
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              className={styles.profit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
            >
              <p className={styles.label}>Job profitability</p>
              <h3>Job #1024</h3>
              <ul>
                <li>
                  <span>Customer payment</span>
                  <strong>₹{profitDemo.payment.toLocaleString("en-IN")}</strong>
                </li>
                <li>
                  <span>Parts</span>
                  <strong>-₹{profitDemo.parts.toLocaleString("en-IN")}</strong>
                </li>
                <li>
                  <span>Technician</span>
                  <strong>-₹{profitDemo.technician.toLocaleString("en-IN")}</strong>
                </li>
                <li>
                  <span>Travel</span>
                  <strong>-₹{profitDemo.travel.toLocaleString("en-IN")}</strong>
                </li>
                <li>
                  <span>Commission</span>
                  <strong>-₹{profitDemo.commission.toLocaleString("en-IN")}</strong>
                </li>
              </ul>
              <div className={styles.profitTotal}>
                <span>Estimated profit</span>
                <strong>
                  ₹{profitDemo.profit.toLocaleString("en-IN")} · {profitDemo.margin}%
                </strong>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
