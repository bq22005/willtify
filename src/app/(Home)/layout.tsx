import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
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
                        <a href="">
                            <img className={styles.headerLogo} src="/willtify-logo.png" alt="" />
                        </a>
                        <nav className={styles.headerNav}>
                            <ul className={styles.navList}>
                                <li className={styles.navItem}><a href="/">Home</a></li>
                                <li className={styles.navItem}><a href="/">About</a></li>
                                <li className={styles.navItem}><a href="/">Letter box</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                {children}
            </body>
        </html>
    );
}
