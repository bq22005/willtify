import styles from "./LetterForm.module.css";
import Button from "@/app/components/elements/Button";
import { useState } from "react";

export default function LetterForm() {
  const [isSend, setIsSend] = useState(false);
	
  const handleSendLetter = () => {
    setIsSend((prev) => !prev);
  };

  return (
    <div className={styles.letterForm}>
      <div className={`${styles.envelope} ${isSend ? styles.active : ""}`}>
				<div className={`${styles.triangle} ${isSend ? styles.active : ""}`}></div>
        <div className={styles.square}></div>
        <div className={`${styles.letter} ${isSend ? styles.active : ""}`}>
          <textarea className={styles.sentence} placeholder="未来にメッセージを送ろう...!"></textarea>
        </div>
      </div>
      <Button onClick={handleSendLetter} label="送信する" />
    </div>
  );
}