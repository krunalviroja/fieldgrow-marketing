"use client";

import { useMemo, useState } from "react";
import { Button } from "primereact/button";
import { useExperience } from "@/context/ExperienceContext";
import styles from "../ExperienceLab.module.scss";

export function JobProfitLab() {
  const { markComplete } = useExperience();
  const [payment, setPayment] = useState(5000);
  const [parts, setParts] = useState(1200);
  const [tech, setTech] = useState(700);
  const [travel, setTravel] = useState(250);
  const [commission, setCommission] = useState(300);
  const [shown, setShown] = useState(false);

  const profit = useMemo(
    () => payment - parts - tech - travel - commission,
    [payment, parts, tech, travel, commission],
  );
  const margin = payment ? Math.round((profit / payment) * 100) : 0;

  return (
    <div className={styles.demoCard}>
      <h3>Job Profitability — real money, not vanity revenue</h3>
      <p>Tune the numbers and see what the owner actually made on Job #1024.</p>

      <div className={styles.row}>
        {[
          ["Customer payment", payment, setPayment],
          ["Parts", parts, setParts],
          ["Technician cost", tech, setTech],
          ["Travel", travel, setTravel],
          ["Commission", commission, setCommission],
        ].map(([label, value, setter]) => (
          <div className={styles.field} style={{ flex: "1 1 140px" }} key={label as string}>
            <label>{label as string}</label>
            <input
              type="number"
              value={value as number}
              onChange={(e) => (setter as (n: number) => void)(Number(e.target.value))}
            />
          </div>
        ))}
      </div>

      <Button
        label="Calculate true profit"
        icon="pi pi-calculator"
        onClick={() => {
          setShown(true);
          markComplete("profit");
        }}
      />

      {shown && (
        <>
          <div className={styles.profitLines}>
            <div>
              <span>Customer payment</span>
              <span>₹{payment.toLocaleString("en-IN")}</span>
            </div>
            <div>
              <span>Parts</span>
              <span>-₹{parts.toLocaleString("en-IN")}</span>
            </div>
            <div>
              <span>Technician cost</span>
              <span>-₹{tech.toLocaleString("en-IN")}</span>
            </div>
            <div>
              <span>Travel</span>
              <span>-₹{travel.toLocaleString("en-IN")}</span>
            </div>
            <div>
              <span>Commission</span>
              <span>-₹{commission.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div className={styles.profitTotal}>
            <span>Estimated profit · {margin}% margin</span>
            <strong>₹{profit.toLocaleString("en-IN")}</strong>
          </div>
        </>
      )}
    </div>
  );
}