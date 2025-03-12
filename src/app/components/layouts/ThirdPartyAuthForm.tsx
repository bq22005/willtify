import styles from "./ThirdPartyAuthForm.module.css";
import { AuthUserButton } from "../elements/AuthUserButton";

export default function ThirdPartyAuthForm() {
  return (
    <div className={styles.authForm}>
      <AuthUserButton provider="github" />
    </div>
  )
}