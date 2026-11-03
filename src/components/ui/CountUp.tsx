"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  value: string;
  className?: string;
};

function parseStat(value: string) {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  // Values such as "1 → ∞" and "Offline" are labels, not counters.
  if (!match || match[3].includes("→")) return null;
  return { prefix: match[1], num: Number(match[2]), suffix: match[3] };
}

export function CountUp({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const parsed = useMemo(() => parseStat(value), [value]);
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!inView || !parsed) return;

    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = parsed.num * eased;
      const text =
        parsed.num % 1 === 0
          ? `${parsed.prefix}${Math.round(current)}${parsed.suffix}`
          : `${parsed.prefix}${current.toFixed(1)}${parsed.suffix}`;
      setDisplay(text);
      if (t < 1) frame = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, parsed, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
