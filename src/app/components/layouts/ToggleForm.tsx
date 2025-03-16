"use client";

import styles from "./ToggleForm.module.css";
import { useState } from "react";
import { Button } from "@/app/components/elements/Button";

export default function ToggleForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className={styles.toggleForm}>
      <div className={`${styles.signInFormContainer} ${isSignUp ? styles.active : ""}`}>
        <h1 className={styles.formTitle}>Sign In</h1>
        <form>
          <div className={styles.socialIcons}></div>
          <input type="text" placeholder="username" required />
          <input type="password" placeholder="password" required />
          <Button label="ログイン" />
        </form>
      </div>
      <div className={`${styles.signUpFormContainer} ${isSignUp ? styles.active : ""}`}>
        <h1 className={styles.formTitle}>Sign Up</h1>
        <form>
          <div className={styles.socialIcons}></div>
          <input type="email" placeholder="email" required />
          <input type="text" placeholder="username" required />
          <input type="password" placeholder="password" required />
          <Button label="サインアップ" />
        </form>
      </div>
      <div className={styles.toggle}>
        <div className={`${styles.toggleLeft} ${isSignUp ? styles.active : ""}`}>
          <div className={styles.togglePanel}>
            <h1 className={styles.toggleTitle}>Hi, there!</h1>
            <p className={styles.toggleText}>...or returning user?</p>
            <button onClick={handleToggle} className={styles.toggleBtn}>ログイン</button>
          </div>
        </div>
        <div className={`${styles.toggleRight} ${isSignUp ? styles.active : ""}`}>
          <div className={styles.togglePanel}>
            <h1 className={styles.toggleTitle}>Welcome, back!</h1>
            <p className={styles.toggleText}>...or looking to sign up?</p>
            <button onClick={handleToggle} className={styles.toggleBtn}>サインアップ</button>
          </div>
        </div>
      </div>
    </div>
  );
}