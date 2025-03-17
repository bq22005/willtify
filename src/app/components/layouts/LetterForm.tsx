"use client";

import styles from "./LetterForm.module.css";
import { fetchUser } from "@/app/lib/fetchUser";
import { postLetter } from "@/app/lib/fetchLetters";
import { Button } from "@/app/components/elements/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const nowDate = new Date();
const nowDateFormatted = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Tokyo",
})
  .format(nowDate)
  .replace(/\//g, "-")
  .replace(/(\d{4})-(\d{2})-(\d{2}), (\d{2}):(\d{2})/, "$1-$2-$3T$4:$5");

export default function LetterForm() {
  const { data: session } = useSession();
  const [autherId, setAutherId] = useState<number | null>(null);
  const [isSend, setIsSend] = useState(false);
  const [sendStatus, setSendStatus] = useState("送信しよう!");
  const [requiredMessage, setRequiredMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("送信する");
  const [message, setMessage] = useState("");
  const [notifyAt, setNotifyAt] = useState(nowDateFormatted);
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetchUser(session.user.email);
          if (!response) {
            throw new Error("Failed to fetch user id");
          }
          setAutherId(response.id);
        } catch (error) {
          console.error("Error fetching user ID:", error);
          setRequiredMessage("ユーザ情報の取得に失敗しました");
        }
      }
    };

    fetchUserId();
  }, [session]);

  const handleSendLetter = async () => {
    if (autherId === null) {
      setRequiredMessage("ログインが必要です!");
      return;
    }

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
      <div className={styles.notifyFormContainer}>
        <div className={styles.notifyForm}>
          <h3 className={styles.dateNav}>通知日:</h3>
          <input
            className={styles.date}
            type="datetime-local"
            min={nowDateFormatted}
            value={notifyAt}
            onChange={(e) => setNotifyAt(e.target.value)}
            />
        </div>
      </div>
      <Button onClick={handleSendLetter} disabled={isButtonDisabled} label={buttonLabel} />
    </div>
  );
}