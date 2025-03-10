"use client";

import styles from "./page.module.css";
import LetterListLayout from "@/app/components/layouts/LetterListLayout";

export default function Home() {
  return (
    <div className={styles.page}>
      <LetterListLayout />
    </div>
  );
}
