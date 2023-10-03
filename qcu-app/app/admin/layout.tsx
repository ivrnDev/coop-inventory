import "@/styles/globals.css";
import { adminMenu } from "@/constants/layout/admin";
import styles from "@/styles/layouts/admin.module.css";
import Header from "@/components/shared/header/Header";

export const metadata = {
  title: "QCU-COOP Administrator",
  description: "Administrator Page",
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
          menu={adminMenu}
          logoSrc="/../images/qcu-logo.png"
          logoAlt="logo"
          logoWidth={75}
          logoHeight={75}
          styles={styles} // Pass the admin styles
          isUser={false}
        />
        <main className="admin_main">{children}</main>
      </body>
    </html>
  );
}
