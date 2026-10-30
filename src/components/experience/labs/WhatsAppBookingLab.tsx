"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { useExperience } from "@/context/ExperienceContext";
import styles from "../ExperienceLab.module.scss";

type Msg = { from: "bot" | "user"; text: string };

const slots = ["10:00 AM", "1:00 PM", "6:00 PM"];

export function WhatsAppBookingLab() {
  const { markComplete } = useExperience();
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "user", text: "Hi, I need AC service." },
    { from: "bot", text: "Sure! Please select your area." },
  ]);

  const push = (from: Msg["from"], text: string) =>
    setMessages((prev) => [...prev, { from, text }]);

  const chooseArea = () => {
    push("user", "Satellite");
    push("bot", "Available slots today:");
    setStep(1);
  };

  const chooseSlot = (slot: string) => {
    push("user", slot);
    push("bot", "Booking created. 👨‍🔧 Rahul will arrive around 12:50 PM.");
    push("bot", "After service: Invoice ₹1,299 · Pay Now · ⭐ Rate your experience");
    setStep(2);
    markComplete("whatsapp");
  };

  return (
    <div className={styles.demoCard}>
      <h3>WhatsApp-first booking journey</h3>
      <p>India&apos;s natural workflow — chat becomes booking, technician, invoice, and review.</p>

      <div className={styles.chat} aria-live="polite">
        {messages.map((msg, idx) => (
          <div
            key={`${msg.text}-${idx}`}
            className={`${styles.bubble} ${msg.from === "bot" ? styles.bubbleBot : styles.bubbleUser}`}
          >
            {msg.text}
            {step === 1 && idx === messages.length - 1 && (
              <div className={styles.slotRow}>
                {slots.map((slot) => (
                  <button key={slot} type="button" className={styles.slot} onClick={() => chooseSlot(slot)}>
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.row}>
        {step === 0 && (
          <Button label="Select area: Satellite" icon="pi pi-map-marker" onClick={chooseArea} />
        )}
        {step === 2 && (
          <div className={styles.successToast}>
            Lead → Booking → Job → Invoice → Review — all from one WhatsApp thread.
          </div>
        )}
      </div>

      <img
        src="/images/whatsapp-booking.jpg"
        alt="WhatsApp booking concept"
        style={{ marginTop: "1rem", borderRadius: 14, maxHeight: 160, width: "100%", objectFit: "cover" }}
      />
    </div>
  );
}