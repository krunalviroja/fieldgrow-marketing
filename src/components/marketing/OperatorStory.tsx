"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useExperience } from "@/context/ExperienceContext";
import { industryProfiles } from "@/lib/content";
import styles from "./OperatorStory.module.scss";

export function OperatorStory() {
  const [clean, setClean] = useState(false);
  const { industry } = useExperience();
  const profile = industryProfiles[industry];
  return <section className={styles.section}><div className="fg-container"><div className={styles.head}><div><p className="fg-eyebrow">The owner’s morning</p><h2>“Technician kab aayega?”<br /><em>Not anymore.</em></h2></div><p className="fg-lead">You don’t need another feature list. You need one place that knows what is happening, what got paid, and which customer is due next.</p></div><div className={`${styles.scene} ${clean ? styles.clean : ""}`}><div className={styles.chaos}><div className={styles.note}><b>WhatsApp</b><span>“Sir, Rahul kaha hai?”</span><span>“AC service required”</span><span>“Okay sir”</span></div><div className={styles.note}><b>Excel · customers-final-2</b><span>{profile.customer}</span><span>Last service: ???</span><span>Follow up: pending</span></div><div className={styles.paper}><b>₹ cash?</b><strong>3,500</strong><small>no receipt</small></div><div className={styles.note}><b>Owner’s memory</b><span>Rahul knows this machine</span><span>Amit has the invoice</span><span>Raj will call them</span></div></div><motion.div className={styles.order} animate={{ opacity: clean ? 1 : 0, y: clean ? 0 : 18 }}><div className={styles.orderTop}><span className={styles.brandDot}>FG</span><div><small>FIELDGROW COMMAND CENTER</small><h3>Everything in view.</h3></div><span className={styles.live}>● LIVE</span></div><div className={styles.orderGrid}><div><small>TODAY’S JOBS</small><strong>24</strong><span>8 technicians · 3 in progress</span></div><div><small>COLLECTED</small><strong>₹84,600</strong><span className={styles.green}>↑ 18.4%</span></div><div><small>NEXT BEST ACTION</small><strong>{profile.nextService}</strong><span>{profile.customer} · {profile.price}</span></div></div><div className={styles.orderFooter}><span>✓ Jobs owned by the business</span><span>↻ Repeat revenue queued</span><span>⌁ Sunday mode: ON</span></div></motion.div><button type="button" className={styles.switch} onClick={() => setClean((value) => !value)}>{clean ? "Show the chaos" : "Clean it up →"}</button></div></div></section>;
}
