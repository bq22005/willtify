import styles from "./page.module.css";
import AuthForm from "@/app/components/layouts/AuthForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <AuthForm />
    </div>
  );
}
