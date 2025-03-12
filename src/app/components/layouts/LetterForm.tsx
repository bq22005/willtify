"use client";

import styles from "./LetterForm.module.css";
import { Button} from "@/app/components/elements/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LetterForm() {
  const [isSend, setIsSend] = useState(false);
  const [sendStatus, setSendStatus] = useState("送信しよう!");
  const [requiredMessage, setRequiredMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("送信する");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSendLetter = () => {
    if (!message.trim()) {
      setRequiredMessage("メッセージの入力は必須です!");
      return;
    }

    if (!isSend) {
      setIsSend((prev) => !prev);
      setIsButtonDisabled(true);
      setRequiredMessage("");
      setSendStatus("送信中...");
      setTimeout(() => {
        setButtonLabel("ホームへ");
        setIsButtonDisabled(false);
        setSendStatus("送信完了!");
      }, 4000);
    } else {
      router.push("/");
    }
  };

  return (
    <div className={styles.letterForm}>
      <h2 className={styles.status}>{sendStatus}</h2>
      <h3 className={styles.required}>{requiredMessage}</h3>
      <div className={`${styles.envelope} ${isSend ? styles.active : ""}`}>
				<div className={`${styles.triangle} ${isSend ? styles.active : ""}`}></div>
        <div className={styles.square}></div>
        <div className={`${styles.letter} ${isSend ? styles.active : ""}`}>
          <textarea
            className={styles.sentence}
            readOnly={isSend}
            placeholder="未来にメッセージを送ろう...!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
      </div>
      <Button onClick={handleSendLetter} disabled={isButtonDisabled} label={buttonLabel} />
    </div>
  );
}