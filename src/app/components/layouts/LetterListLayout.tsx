import styles from "./LetterListLayout.module.css";
import { Letter } from "@/app/lib/fetchLetters";

export default function LetterListLayout({id, auther, content, notifyAt}: Letter) {
  return (
    <div className={styles.letterListLayout}>
      <div className={styles.container}>
        <a href="">
          <div className={styles.user}>
            <img className={styles.userIcon} src={auther.icon}/>
            <p className={styles.username}>{auther.username}</p>
            <p className={styles.date}>{notifyAt}</p>
          </div>
        </a>
        <div className={styles.sentenceContainer}>
          <p className={styles.sentence} >{content}</p>
        </div>
      </div>
    </div>
  );
}