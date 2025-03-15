import styles from "./NotifyForm.module.css";

export default function NotifyForm() {
  return (
    <div className={styles.notifyForm}>
      <div className={styles.notifyFormContainer}>
        <h3 className={styles.dateNav}>通知日:</h3>
        <input className={styles.date} type="date" />
      </div>
    </div>
  )
}