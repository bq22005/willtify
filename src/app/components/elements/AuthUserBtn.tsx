import styles from "./AuthUserBtn.module.css";
import { signIn, signOut } from "@/auth";

type AuthUserBtnProps = {
  provider: string;
}

export function AuthUserBtn({ provider }: AuthUserBtnProps) {
  return (
    <form action={async () => {
      "use server";
      await signIn(provider, { redirectTo: "/"});
    }}>
      <button className={styles.providerBtn}>
        <img className={styles.providerImg} src={`${provider}.svg`} alt={provider} />
      </button>
    </form>
  );
}

export function ExpireUserBtn() {
  return (
    <form action={async () => {
      "use server";
      await signOut({ redirectTo: "/auth"});
    }}>
      <button className={styles.signOutBtn}>
        Logout
      </button>
    </form>
  );
}