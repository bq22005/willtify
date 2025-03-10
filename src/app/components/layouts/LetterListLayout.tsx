import styles from "./LetterListLayout.module.css";

export default function LetterListLayout() {
  return (
    <div className={styles.letterListLayout}>
      <div className={styles.container}>
        <div className={styles.user}>
          <img className={styles.userIcon} src="/user_default.png"/>
          <a href="/">
            <p>username</p>
          </a>
        </div>
        <div className={styles.sentenceContainer}>
          <textarea className={styles.sentence}>sample</textarea>
        </div>
      </div>
    </div>
  );
}