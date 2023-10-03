import "@/styles/globals.css";
import { userMenu } from "@/constants/layout/user";
import styles from "@/styles/layouts/user.module.css";
import Header from "@/components/shared/header/Header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QCU Coop",
  description: "A Quezon City University Cooperatives Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header
          menu={userMenu}
          title="QCU COOP STORE"
          logoSrc="/../images/qcu-logo.png"
          logoAlt="logo"
          logoWidth={55}
          logoHeight={55}
          styles={styles}
          isUser={true}
        />

       
        <main className="user_main">{children}</main>
      </body>
    </html>
  );
}
