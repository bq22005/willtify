import styles from "./AuthUserButton.module.css";
import { signIn } from "@/auth";

type AuthUserButtonProps = {
  provider: string;
}

export function AuthUserButton({ provider }: AuthUserButtonProps) {
  return (
    <form action={async () => {
      "use server";
      await signIn(provider);
    }}>
      <button className={styles.providerBtn}>
        <img className={styles.providerImg} src={`${provider}.svg`} alt={provider} />
      </button>
    </form>
  );
}