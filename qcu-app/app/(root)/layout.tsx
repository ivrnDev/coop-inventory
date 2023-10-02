import Navbar from "@/components/shared/Navbar/UserNavbar";
import "@/styles/globals.css";

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
        <Navbar />
        <main className="user_main">{children}</main>
      </body>
    </html>
  );
}
