import styles from "./Avator.module.css";
import { auth } from "@/auth";

export async function Avator() {
  const session = await auth();
  console.log(session);

  if (!session?.user) {
    return(
      <div className={styles.avator}>
        <div className={styles.userInfo}>
          <a href="/auth"><p className={styles.signin}>サインイン</p></a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.avator}>
      {session.user.image && (
        <div className={styles.userInfo}>
          <img
          className={styles.avatorImg}
          src={session.user.image}
          alt={session.user.name ?? ""}
          />
          <p className={styles.userName}>{session.user.name}</p>
        </div>
      )}
    </div>
  );
}