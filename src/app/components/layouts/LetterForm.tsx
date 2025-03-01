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
            <div className={styles.envelope}>
                <div className={styles.triangle}></div>
                <div className={styles.square}>
                    <div className={styles.letter}>
                        <textarea className={styles.sentence} placeholder="未来にメッセージを送ろう...!"></textarea>
                    </div>
                </div>
            </div>
            <Button onClick={handleSendLetter} label="送信する" />
        </div>
    );
}