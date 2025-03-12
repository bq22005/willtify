import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "@/app/globals.css";
import styles from "./layout.module.css";

const MPlusRounded1c = M_PLUS_Rounded_1c({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "willtify",
  description: "未来の誰かにメッセージを届けよう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${MPlusRounded1c.className}`}>
        <header>
          <div className={styles.container}>
            <a className={styles.imageContainer} href="/">
              <img className={styles.headerLogo} src="/willtify-logo.svg" alt="" />
            </a>
            <nav className={styles.headerNav}>
              <ul className={styles.navList}>
                <li className={styles.navItem}><a href="/">Home</a></li>
                <li className={styles.navItem}><a href="/letter">Send</a></li>
                <li className={styles.navItem}><a href="/letterbox">Letter box</a></li>
                <li className={styles.navItem}><a href="/logout">Logout</a></li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
