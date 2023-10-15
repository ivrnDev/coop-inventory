import AdminHeader from "@/components/header/AdminHeader";
import AdminNavBar from "@/components/header/AdminNavbar";
import "@/styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QCU Admin",
  description: "A Quezon City University Cooperatives Store",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNavBar />
      <AdminHeader />
      
      <main className="admin-main">{children}</main>
    </>
  );
}
