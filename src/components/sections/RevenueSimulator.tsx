"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import styles from "./RevenueSimulator.module.scss";

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function RevenueSimulator() {
  const [technicians, setTechnicians] = useState(8);
  const [jobsPerMonth, setJobsPerMonth] = useState(320);
  const [avgJob, setAvgJob] = useState(2500);

  const recovered = useMemo(() => {
    const dormant = jobsPerMonth * 0.12 * avgJob;
    const quotes = jobsPerMonth * 0.08 * avgJob;
    const amc = technicians * 1.5 * avgJob * 0.1;
    return Math.round(dormant + quotes + amc);
  }, [technicians, jobsPerMonth, avgJob]);

  const spring = useSpring(recovered, { stiffness: 90, damping: 20 });
  const label = useTransform(spring, (v) => formatInr(Math.round(v)));

  useEffect(() => {
    spring.set(recovered);
  }, [recovered, spring]);

  return (
    <section id="revenue" className={`fg-section ${styles.section}`}>
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Interactive growth lab</p>
          <h2 className="fg-title">See missed revenue your business may be leaving behind</h2>
          <p className="fg-lead">
            Drag the sliders. FieldGrow estimates monthly recovery from dormant customers, stale
            quotations, and AMC renewals — the growth layer most FSM tools never show.
          </p>
        </div>

        <div className={styles.panel}>
          <div className={styles.controls}>
            <label>
              <span>
                Technicians <strong>{technicians}</strong>
              </span>
              <input
                type="range"
                min={3}
                max={40}
                value={technicians}
                onChange={(e) => setTechnicians(Number(e.target.value))}
              />
            </label>
            <label>
              <span>
                Jobs / month <strong>{jobsPerMonth}</strong>
              </span>
              <input
                type="range"
                min={80}
                max={1200}
                step={10}
                value={jobsPerMonth}
                onChange={(e) => setJobsPerMonth(Number(e.target.value))}
              />
            </label>
            <label>
              <span>
                Avg job value <strong>{formatInr(avgJob)}</strong>
              </span>
              <input
                type="range"
                min={800}
                max={8000}
                step={100}
                value={avgJob}
                onChange={(e) => setAvgJob(Number(e.target.value))}
              />
            </label>
          </div>

          <div className={styles.result}>
            <p>Estimated monthly recovery</p>
            <motion.strong>{label}</motion.strong>
            <ul>
              <li>Dormant customer reactivation</li>
              <li>Stale quotation follow-ups</li>
              <li>AMC / maintenance renewals</li>
            </ul>
            <a className="fg-btn fg-btn--primary" href="#resources">
              Recover this with FieldGrow
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
