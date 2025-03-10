import styles from "./LetterListLayout.module.css";

export default function LetterListLayout() {
  return (
    <div className={styles.letterListLayout}>
      <div className={styles.container}>
        <div className={styles.user}>
          <img className={styles.userIcon} src="/user_default.png"/>
          <a href="/">
            <p className={styles.username}>username</p>
          </a>
          <p className={styles.date}>xxxx年x月xx日</p>
        </div>
        <div className={styles.sentenceContainer}>
          <p className={styles.sentence} >sample</p>
        </div>
      </div>
    </div>
  );
}