"use client";

import { useState, type FormEvent } from "react";
import { brand } from "@/lib/content";
import styles from "./LoginSection.module.scss";

export function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Enter your work email and password to continue.");
      return;
    }
    setMessage("Login portal wiring comes next — your credentials were captured for demo flow.");
  }

  return (
    <section id="login" className={`fg-section ${styles.section}`} aria-label="Login">
      <div className={`fg-container ${styles.wrap}`}>
        <div className={styles.copy}>
          <p className="fg-eyebrow">Account access</p>
          <h2 className="fg-title">Login to FieldGrow</h2>
          <p className="fg-lead">
            Owners, dispatchers, and technicians enter the same operating system — web for command,
            mobile for the field.
          </p>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <label>
            Work email
            <input
              type="email"
              name="email"
              autoComplete="username"
              placeholder="you@business.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="fg-btn fg-btn--primary">
            Login
          </button>
          <p className={styles.hint}>
            Need access?{" "}
            <a href={`mailto:${brand.email}`}>Request credentials</a>
          </p>
          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </section>
  );
}
