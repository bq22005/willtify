import styles from "./LetterListLayout.module.css";
import { OtherLetter } from "@/app/lib/fetchOtherLetters";

export default function LetterListLayout({id, username, icon, date, text}: OtherLetter) {
  return (
    <div className={styles.letterListLayout}>
      <div className={styles.container}>
        <a href="">
          <div className={styles.user}>
            <img className={styles.userIcon} src={icon}/>
            <p className={styles.username}>{username}</p>
            <p className={styles.date}>{date}</p>
          </div>
        </a>
        <div className={styles.sentenceContainer}>
          <p className={styles.sentence} >{text}</p>
        </div>
      </div>
    </div>
  );
}