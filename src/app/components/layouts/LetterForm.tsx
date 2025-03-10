import styles from "./LetterForm.module.css";
import Button from "@/app/components/elements/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LetterForm() {
  const [isSend, setIsSend] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("送信する");
  const router = useRouter();

  const handleSendLetter = () => {
    if (!isSend) {
      setIsSend((prev) => !prev);
      setIsButtonDisabled(true);
      setTimeout(() => {
        setButtonLabel("ホームへ");
        setIsButtonDisabled(false);      
      }, 4000);
    } else {
      router.push("/");
    }
  };

  return (
    <div className={styles.letterForm}>
      <div className={`${styles.envelope} ${isSend ? styles.active : ""}`}>
				<div className={`${styles.triangle} ${isSend ? styles.active : ""}`}></div>
        <div className={styles.square}></div>
        <div className={`${styles.letter} ${isSend ? styles.active : ""}`}>
          <textarea className={styles.sentence} readOnly={isSend} placeholder="未来にメッセージを送ろう...!"></textarea>
        </div>
      </div>
      <Button onClick={handleSendLetter} disabled={isButtonDisabled} label={buttonLabel} />
    </div>
  );
}