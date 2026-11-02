import { outcomeTicker } from "@/lib/content";
import styles from "./TickerSection.module.scss";

export function TickerSection() {
  const items = [...outcomeTicker, ...outcomeTicker];

  return (
    <section className={styles.ticker} aria-label="Outcomes">
      <div className={styles.track}>
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.item}>
            <em />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
