import styles from "./page.module.css";
import AuthForm from "@/app/components/layouts/AuthForm";

export default function Auth() {
    return (
        <div className={styles.signup}>
            <AuthForm />
        </div>
    )
}