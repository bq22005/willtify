import styles from "./page.module.css";
import OtherLetterList from "@/app/components/layouts/OtherLetterList";

export default function Home() {
  return (
    <div className={styles.page}>
      <OtherLetterList />
    </div>
  );
}
