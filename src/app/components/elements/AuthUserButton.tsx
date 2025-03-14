import { redirect } from "next/dist/server/api-utils";
import styles from "./AuthUserButton.module.css";
import { signIn, signOut } from "@/auth";

type AuthUserButtonProps = {
  provider: string;
}

export function AuthUserBtn({ provider }: AuthUserButtonProps) {
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