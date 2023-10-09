import AdminHeader from "@/components/header/Admin";
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
      <main className="admin-main">{children}</main>
    </>
  );
}
