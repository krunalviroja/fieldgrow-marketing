"use client";

import { useEffect, useState } from "react";
import styles from "./Spotlight.module.scss";

export function Spotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className={`${styles.spot} ${visible ? styles.on : ""}`}
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    />
  );
}
