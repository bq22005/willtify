import styles from "./page.module.css";
import MyLetterList from "@/app/components/layouts/MyLetterList";

export default function LetterBox() {
  return (
    <div className={styles.page}>
      <MyLetterList />
    </div>
  );
}