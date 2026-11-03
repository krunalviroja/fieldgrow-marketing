"use client";

import { useState } from "react";
import styles from "./MigrationSection.module.scss";

const sources = ["Excel", "Tally", "Google Sheets", "WhatsApp contacts", "Other FSM"];

export function MigrationSection() {
  const [started, setStarted] = useState(false);
  return <section id="migration" className={styles.section}><div className="fg-container"><div className={styles.card}><div className={styles.copy}><p className="fg-eyebrow">Migration, without the reboot</p><h2>Bring your business as it is.</h2><p>Still running on WhatsApp, Excel, Tally and paper? We move your customers, jobs and service history into FieldGrow with free or low-cost onboarding.</p><div className={styles.chips}>{sources.map((source) => <span key={source}>{source}</span>)}</div><button type="button" className="fg-btn fg-btn--primary" onClick={() => setStarted(true)}>{started ? "Sample data mapped ✓" : "Try the migration demo →"}</button></div><div className={styles.wizard}><div className={styles.wizardTop}><span>IMPORT CENTER</span><b>● SAFE SANDBOX</b></div><div className={styles.file}><span className={styles.fileIcon}>XLS</span><div><strong>customers_august.xlsx</strong><small>1,284 rows · 3.8 MB</small></div><span className={styles.check}>{started ? "✓" : "→"}</span></div><div className={styles.mapping}>{[["Name","Customer"],["Phone","Mobile"],["Last Service","Service date"],["Assigned to","Technician"]].map(([from,to]) => <div key={from}><span>{from}</span><i>→</i><strong>{to}</strong></div>)}</div><div className={styles.result}><strong>{started ? "1,284 customers ready" : "Drop a file. We’ll do the cleanup."}</strong><small>{started ? "37 duplicates merged · 3,902 jobs mapped" : "No engineering project. No painful reboot."}</small></div></div></div></div></section>;
}
