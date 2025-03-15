"use client";

import styles from "./MyLetterList.module.css";
import LetterListLayout from "@/app/components/layouts/LetterListLayout";
import { Letter, fetchMyLetters } from "@/app/lib/fetchLetters";
import { useEffect, useState } from "react";

const defaultLetter: Letter = {
  id: 0,
  auther: { id: 0, username: "user", icon: "/user_default.png"},
  content: "サンプルレター",
  notifyAt: "xxxx年xx月xx日",
}

export default function MyLetterList() {
  const [myLetters, setMyLetters] = useState<Letter[]>([]);

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
            auther={letter.auther}
            content={letter.content}
            notifyAt={letter.notifyAt}
          />
        ))}
    </div>
  );
}