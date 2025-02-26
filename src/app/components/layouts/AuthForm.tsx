import styles from "./AuthForm.module.css";
import { useState } from "react";
import Button from "@/app/components/elements/Button";

export default function AuthForm() {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleToggle = () => {
        setIsSignUp((prev) => !prev);
    };

    return (
        <div className={styles.authForm}>
            <div className={isSignUp ? styles.signInFormContainer : styles.signInFormContainerActive}>
                <form>
                    <h1 className={styles.formTitle}>Sign In</h1>
                    <div className={styles.socialIcons}></div>
                    <input type="text" placeholder="username" required />
                    <input type="password" placeholder="password" required />
                    <Button label="ログイン" />
                </form>
            </div>
            <div className={isSignUp ? styles.signUpFormContainer : styles.signUpFormContainerActive}>
                <form>
                    <h1 className={styles.formTitle}>Sign Up</h1>
                    <div className={styles.socialIcons}></div>
                    <input type="text" placeholder="username" required />
                    <input type="password" placeholder="password" required />
                    <Button label="サインアップ" />
                </form>
            </div>
            <div className={isSignUp ? styles.toggleLeft : styles.toggleLeftActive}>
                <div className={styles.togglePanel}>
                    <h1 className={styles.toggleTitle}>Hi, there!</h1>
                    <p>...or returning user?</p>
                    <button onClick={handleToggle} className={styles.toggleBtn}>ログイン</button>
                </div>
            </div>
            <div className={isSignUp ? styles.toggleRight : styles.toggleRightActive}>
                <div className={styles.togglePanel}>
                    <h1 className={styles.toggleTitle}>Welcome, back!</h1>
                    <p>...or looking to sign up?</p>
                    <button onClick={handleToggle} className={styles.toggleBtn}>サインアップ</button>
                </div>
            </div>
        </div>
    );
}