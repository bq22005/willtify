import styles from "./ThirdPartyAuthForm.module.css";
import { AuthUserBtn } from "../elements/AuthUserBtn";

export default function ThirdPartyAuthForm() {
  return (
    <div className={styles.authForm}>
      <div className={styles.authFormContainer}>
      <h3 className={styles.authText}>Sign in with...</h3>
      <div className={styles.providerIconContainer}>
        <AuthUserBtn provider="google" />
        <AuthUserBtn provider="github" />
      </div>
      </div>
    </div>
  );
}