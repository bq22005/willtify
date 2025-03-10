"use client";

import styles from "./page.module.css";
import LetterListLayout from "@/app/components/layouts/LetterListLayout";
import { OtherLetter, fetchOtherLetters } from "@/app/lib/fetchOtherLetters";
import { useEffect, useState } from "react";

const defaultLetter: OtherLetter = {
  id: 0,
  username: "user",
  icon: "/user_default.png",
  date: "xxxx年xx月xx日",
  text: "これが最初の手紙になります.",
}

export default function Home() {
  const [otherLetters, setOtherLetters] = useState<OtherLetter[]>([defaultLetter]);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const letterData = await fetchOtherLetters();

        setOtherLetters(letterData.length > 0 ? letterData : [defaultLetter]);
      } catch (error) {
        console.error("Failed to fetch other letters.", error);
        setOtherLetters([defaultLetter]);
      }
    }

    fetchLetters();
  }, []);

  return (
    <div className={styles.page}>
      {otherLetters.map((letter) => (
        <LetterListLayout
          key={letter.id}
          id={letter.id}
          username={letter.username}
          icon={letter.icon}
          date={letter.date}
          text={letter.text}
        />
      ))}
    </div>
  );
}
