"use client";

import styles from "./LetterForm.module.css";
import { postLetter } from "@/app/lib/fetchLetters";
import { Button } from "@/app/components/elements/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LetterForm() {
  const [isSend, setIsSend] = useState(false);
  const [sendStatus, setSendStatus] = useState("送信しよう!");
  const [requiredMessage, setRequiredMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("送信する");
  const [message, setMessage] = useState("");
  const [notifyAt, setNotifyAt] = useState("");
  const router = useRouter();

  const handleSendLetter = async () => {
    if (!message.trim()) {
      setRequiredMessage("メッセージの入力は必須です!");
      return;
    }
    if (!notifyAt) {
      setRequiredMessage("通知日を設定してください!");
      return;
    }

    if (!isSend) {
      setIsSend((prev) => !prev);
      setIsButtonDisabled(true);
      setRequiredMessage("");
      setSendStatus("送信中...");

      try {
        const autherId = 1;
        await postLetter(autherId, message, new Date(notifyAt));

        setTimeout(() => {
          setButtonLabel("ホームへ");
          setIsButtonDisabled(false);
          setSendStatus("送信完了!");
        }, 4000);
      } catch (error) {
        console.error("Failed to send letter", error);
        setSendStatus("送信に失敗しました");
        setIsSend(false);
        setIsButtonDisabled(false);
      }

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
      <div className={styles.notifyForm}>
        <div className={styles.notifyFormContainer}>
          <h3 className={styles.dateNav}>通知日:</h3>
          <input
            className={styles.date}
            type="date"
            value={notifyAt}
            onChange={(e) => setNotifyAt(e.target.value)}
            />
        </div>
      </div>
      <Button onClick={handleSendLetter} disabled={isButtonDisabled} label={buttonLabel} />
    </div>
  );
}