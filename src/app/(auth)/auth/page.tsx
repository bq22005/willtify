import styles from "./page.module.css";
import AuthForm from "@/app/components/layouts/AuthForm";
import ThirdPartyAuthForm from "@/app/components/layouts/ThirdPartyAuthForm";

export default function Auth() {
  return (
    <div className={styles.auth}>
      <AuthForm />
      <ThirdPartyAuthForm />
    </div>
  );
}