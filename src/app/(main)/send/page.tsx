import styles from "./page.module.css";
import LetterForm from "@/app/components/layouts/LetterForm";
import { SessionProvider } from "next-auth/react";

export default function Letter() {
  return (
    <div>
      <SessionProvider>
        <LetterForm />
      </SessionProvider>
    </div>
  );
}