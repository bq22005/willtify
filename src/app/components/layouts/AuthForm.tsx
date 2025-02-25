import { useState } from "react";
import styles from "./AuthForm.module.css";

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
                    <button type="submit">ログイン</button>
                </form>
            </div>
            <div className={isSignUp ? styles.signUpFormContainer : styles.signUpFormContainerActive}>
                <form>
                    <h1 className={styles.formTitle}>Sign Up</h1>
                    <div className={styles.socialIcons}></div>
                    <input type="text" placeholder="username" required />
                    <input type="password" placeholder="password" required />
                    <button type="submit">サインアップ</button>
                </form>
            </div>
            <div className={isSignUp ? styles.toggleLeft : styles.toggleLeftActive}>
                <div className={styles.togglePanel}>
                    <h1 className={styles.toggleTitle}>Hi, there!</h1>
                    <p>...or returning user?</p>
                    <span onClick={handleToggle} className={styles.toggleElements}>ログイン</span>
                </div>
            </div>
            <div className={isSignUp ? styles.toggleRight : styles.toggleRightActive}>
                <div className={styles.togglePanel}>
                    <h1 className={styles.toggleTitle}>Welcome, back!</h1>
                    <p>...or looking to sign up?</p>
                    <span onClick={handleToggle} className={styles.toggleElements}>サインアップ</span>
                </div>
            </div>
        </div>
    );
}