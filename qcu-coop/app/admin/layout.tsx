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
      <AdminHeader />
      <main className="min-h-admin-main-mobile lg:min-h-admin-main lg:w-admin-main lg:ml-admin-main bg-green-500 lg:bg-blue-950">{children}</main>
      <AdminNavBar />
    </>
  );
}
