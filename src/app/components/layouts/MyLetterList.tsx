"use client";

import styles from "./MyLetterList.module.css";
import LetterListLayout from "@/app/components/layouts/LetterListLayout";
import { MyLetter, fetchMyLetters } from "@/app/lib/fetchMyLetters";
import { useEffect, useState } from "react";

const defaultLetter: MyLetter = {
  id: 0,
  letterid: 0,
  username: "user",
  icon: "/user_default.png",
  date: "xxxx年xx月xx日",
  text: "ここに作成した手紙が表示されます.",
}

export default function MyLetterList() {
  const [myLetters, setMyLetters] = useState<MyLetter[]>([]);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const letterData = await fetchMyLetters();
  
        setMyLetters(letterData.length > 0 ? [letterData] : [defaultLetter]);
      } catch (error) {
        console.error("Failed to fetch my letters.", error);
      }
    };

    fetchLetters();
  }, []);

  return (
    <div className={styles.page}>
        {myLetters.map((letter) => (
          <LetterListLayout
            key={letter.id}
            id={letter.id}
            letterid={letter.letterid}
            username={letter.username}
            icon={letter.icon}
            date={letter.date}
            text={letter.text}
          />
        ))}
    </div>
  );
}