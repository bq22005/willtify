import styles from "./AuthForm.module.css";
import ToggleForm from "@/app/components/layouts/ToggleForm";

export default function AuthForm() {

  return (
    <div className={styles.authForm}>
      <ToggleForm />
    </div>
  );
}