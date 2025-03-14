import styles from "./ThirdPartyAuthForm.module.css";
import { AuthUserBtn } from "../elements/AuthUserButton";

export default function ThirdPartyAuthForm() {
  return (
    <div className={styles.authForm}>
      <AuthUserBtn provider="github" />
    </div>
  );
}