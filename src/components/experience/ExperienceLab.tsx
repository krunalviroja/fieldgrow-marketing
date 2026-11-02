"use client";

import { experienceTabs } from "@/lib/content";
import { useExperience } from "@/context/ExperienceContext";
import { SocialPostLab } from "./labs/SocialPostLab";
import { WebsiteDeployLab } from "./labs/WebsiteDeployLab";
import { WhatsAppBookingLab } from "./labs/WhatsAppBookingLab";
import { MissedRevenueLab } from "./labs/MissedRevenueLab";
import { Customer360Lab } from "./labs/Customer360Lab";
import { JobProfitLab } from "./labs/JobProfitLab";
import styles from "./ExperienceLab.module.scss";

const labMap = {
  social: SocialPostLab,
  website: WebsiteDeployLab,
  whatsapp: WhatsAppBookingLab,
  revenue: MissedRevenueLab,
  customer360: Customer360Lab,
  profit: JobProfitLab,
} as const;

export function ExperienceLab() {
  const { activeTab, setActiveTab, completedLabs } = useExperience();
  const ActiveLab = labMap[activeTab];
  const activeMeta = experienceTabs.find((tab) => tab.id === activeTab)!;
  const progress = Math.round((completedLabs.length / experienceTabs.length) * 100);

  return (
    <section className={`fg-section ${styles.section}`} id="experience">
      <div className="fg-container">
        <div className={styles.head}>
          <p className="fg-eyebrow">Experience Lab</p>
          <h2 className="fg-title">Don&apos;t just read features — try them</h2>
          <p className="fg-lead">
            Like the best FSM demos, feel the product: generate posts, deploy a site, book on
            WhatsApp, recover missed revenue, open Customer 360, and see real job profit.
          </p>
        </div>

        <div className={styles.shell}>
          <div className={styles.tabs} role="tablist" aria-label="Experience labs">
            {experienceTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {completedLabs.includes(tab.id) && (
                  <i className={`pi pi-check-circle ${styles.done}`} aria-label="completed" />
                )}
              </button>
            ))}
          </div>

          <div className={styles.body}>
            <aside className={styles.side}>
              <h3 style={{ marginTop: 0, fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
                {activeMeta.label}
              </h3>
              <p>{activeMeta.blurb}</p>
              <div className={styles.progress}>
                Lab progress · {completedLabs.length}/{experienceTabs.length}
                <div className={styles.progressBar}>
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
              <img
                src="/images/dashboard-preview.jpg"
                alt="FieldGrow dashboard preview"
                style={{
                  marginTop: "1.25rem",
                  borderRadius: 14,
                  border: "1px solid var(--fg-line)",
                }}
              />
            </aside>
            <div className={styles.panel}>
              <ActiveLab />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
