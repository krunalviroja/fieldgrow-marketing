"use client";

import { motion } from "framer-motion";
import { brand, industryProfiles, type IndustryId } from "@/lib/content";
import { useExperience } from "@/context/ExperienceContext";
import styles from "./ControlRoomHero.module.scss";

const industries = Object.entries(industryProfiles) as [IndustryId, (typeof industryProfiles)[IndustryId]][];

export function ControlRoomHero() {
  const { industry, setIndustry } = useExperience();
  const profile = industryProfiles[industry];

  return (
    <section className={styles.hero} aria-label="FieldGrow product introduction">
      <div className={styles.noise} aria-hidden />
      <div className={`fg-container ${styles.inner}`}>
        <div className={styles.copy}>
          <div className={styles.signal}><span /> Service-to-Growth Engine™ <b>LIVE</b></div>
          <h1>Your technicians do the job. <em>We bring the next customer.</em></h1>
          <p className={styles.lead}>
            The operating system for Indian service businesses — from the first WhatsApp enquiry to the next ₹{profile.price.replace("₹", "")} booking.
          </p>
          <div className={styles.actions}>
            <a className="fg-btn fg-btn--primary" href="#playground">Try the live demo <span>↗</span></a>
            <a className={styles.textCta} href={`mailto:${brand.email}`}>Book a walkthrough <span>→</span></a>
          </div>
          <div className={styles.industryRow}>
            <span>Built for</span>
            {industries.map(([id, item]) => (
              <button key={id} type="button" className={id === industry ? styles.industryActive : ""} onClick={() => setIndustry(id)}>
                {item.icon} {item.shortLabel}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.controlRoom}>
          <div className={styles.windowBar}><i /><i /><i /><span>fieldgrow.app / command-center</span><b>● synced</b></div>
          <div className={styles.dashboard}>
            <aside><strong>FG</strong><span className={styles.activeIcon}>⌂</span><span>◷</span><span>♙</span><span>↗</span><span>⚙</span></aside>
            <div className={styles.dashMain}>
              <div className={styles.dashTop}><div><small>MONDAY · 12 AUGUST</small><h2>Good morning, owner.</h2></div><div className={styles.avatar}>AS</div></div>
              <div className={styles.metricGrid}>
                <div><small>JOBS TODAY</small><strong>24</strong><span className={styles.green}>↑ 12% vs last week</span></div>
                <div><small>COLLECTED</small><strong>₹84,600</strong><span className={styles.green}>↑ 18.4%</span></div>
                <div className={styles.opportunity}><small>REVENUE TO RECOVER</small><strong>₹1,55,500</strong><span>4 actions waiting →</span></div>
              </div>
              <div className={styles.dashColumns}>
                <div className={styles.jobList}><div className={styles.sectionLabel}>LIVE JOB BOARD <b>View all →</b></div>{["Rahul · AC Service", "Amit · Installation", "Karan · AMC renewal"].map((job, i) => <div className={styles.job} key={job}><span className={`${styles.status} ${i === 1 ? styles.amber : ""}`} /> <div><strong>{job}</strong><small>{profile.city} · {i === 0 ? "In progress" : i === 1 ? "En route" : "Upcoming"}</small></div><b>{["10:00", "11:30", "14:00"][i]}</b></div>)}</div>
                <div className={styles.loopCard}><div className={styles.sectionLabel}>TODAY’S GROWTH LOOP</div><div className={styles.loopVisual}><motion.div className={styles.orbit} animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }}><span>₹</span><span>★</span><span>↻</span></motion.div><div className={styles.loopCenter}>JOB<br /><b>→</b><br />REPEAT</div></div><small>1 completed job can create<br /><strong>the next revenue event.</strong></small></div>
              </div>
            </div>
          </div>
          <div className={styles.toast}><span>✓</span><div><strong>New booking from WhatsApp</strong><small>{profile.customer} · {profile.service}</small></div><b>₹999</b></div>
        </div>
      </div>
      <div className={styles.ticker}><div><span>● 12 businesses are finding revenue right now</span><span>WhatsApp → Booking → Job → Review → Repeat</span><span>Offline-first · Built for India</span><span>● 12 businesses are finding revenue right now</span></div></div>
    </section>
  );
}
