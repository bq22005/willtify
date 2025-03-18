"use client";

import styles from "./OtherLetterList.module.css";
import LetterListLayout from "@/app/components/layouts/LetterListLayout";
import { Letter, fetchOtherLetters } from "@/app/lib/fetchLetters";
import { useEffect, useState } from "react";

const defaultLetter: Letter = {
  id: 0,
  auther: { id: 0, username: "user", icon: "/user_default.png"},
  content: "サンプルレター",
  notifyAt: "xxxx-xx-xx-",
}

export default function OtherLetterList() {
  const [otherLetters, setOtherLetters] = useState<Letter[]>([defaultLetter]);

  useEffect(() => {
      const fetchLetters = async () => {
        try {
          const letterData = await fetchOtherLetters();
          setOtherLetters(letterData.length > 0 ? letterData : [defaultLetter]);
        } catch (error) {
          console.error("Failed to fetch my letters", error);
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
            auther={letter.auther}
            content={letter.content}
            notifyAt={letter.notifyAt}
          />
        ))}
    </div>
  );
}