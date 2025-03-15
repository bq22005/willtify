import styles from "./page.module.css";
import MyLetterList from "@/app/components/layouts/MyLetterList";
import { SessionProvider } from "next-auth/react";

export default function LetterBox() {
  return (
    <div className={styles.page}>
      <SessionProvider>
        <MyLetterList />
      </SessionProvider>
    </div>
  );
}