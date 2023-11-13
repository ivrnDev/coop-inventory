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
      <main className="bg-main-admin min-h-admin-main-mobile md:min-h-admin-main md:w-admin-main md:ml-admin-main">
        {children}
      </main>
      <AdminNavBar />
    </>
  );
}
