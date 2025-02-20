import styles from "./AuthForm.module.css";

export default function AuthForm() {
    return (
        <div className={styles.authForm}>
            <div className={styles.signInFormContainer}>
                <form>
                    <h1 className={styles.formTitle}>Sign In</h1>
                    <div className={styles.socialIcons}></div>
                    <input type="text" placeholder="username" required />
                    <input type="password" placeholder="password" required />
                    <button type="submit">ログイン</button>
                </form>
            </div>
            <div className={styles.signUpFormContainer}>
                <form>
                    <h1 className={styles.formTitle}>Sign Up</h1>
                    <div className={styles.socialIcons}></div>
                    <input type="text" placeholder="username" required />
                    <input type="password" placeholder="password" required />
                    <button type="submit">サインアップ</button>
                </form>
            </div>
            <div className={styles.toggleLeft}>
                <div className={styles.switchPage}>
                    <h1 className={styles.toggleTitle}>Hi, there!</h1>
                    <span className={styles.switchPage}>ログイン</span>
                </div>
            </div>
            <div className={styles.toggleRight}>
                <div className={styles.switchPage}>
                    <h1 className={styles.toggleTitle}>Welcome, back!</h1>
                    <span className={styles.switchPage}>サインアップ</span>
                </div>
            </div>
        </div>
    );
}