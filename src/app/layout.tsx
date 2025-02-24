import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

const MPlusRounded1c = M_PLUS_Rounded_1c({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notifill",
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
        {children}
      </body>
    </html>
  );
}
