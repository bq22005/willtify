"use client";

import styles from "./ToggleForm.module.css";
import { useState } from "react";
import { Button } from "@/app/components/elements/Button";
import { useRouter } from "next/navigation";

export default function ToggleForm() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("サインアップ成功");
    } else {
      alert(data.error);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: formData.username, password: formData.password }),
    });

    const data = await response.json();
    if (response.ok) {
      router.push("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className={styles.toggleForm}>
      <div className={`${styles.signInFormContainer} ${isSignUp ? styles.active : ""}`}>
        <h1 className={styles.formTitle}>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className={styles.socialIcons}></div>
          <input type="text" name="username" placeholder="username" required onChange={handleChange} />
          <input type="password" name="password" placeholder="password" required onChange={handleChange} />
          <Button label="ログイン" />
        </form>
      </div>
      <div className={`${styles.signUpFormContainer} ${isSignUp ? styles.active : ""}`}>
        <h1 className={styles.formTitle}>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className={styles.socialIcons}></div>
          <input type="email" name="email" placeholder="email" required onChange={handleChange} />
          <input type="text" name="username" placeholder="username" required onChange={handleChange} />
          <input type="password" name="password" placeholder="password" required onChange={handleChange} />
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