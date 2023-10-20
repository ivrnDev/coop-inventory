import CategoriesSidebar from "@/components/header/Categories";
import HomeHeader from "@/components/header/Home";
import "@/styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QCU Coop Store",
  description: "A Quezon City University Cooperatives Store",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeHeader />
      <CategoriesSidebar />
      <main className="bg-main-user min-h-user-main-mobile md:min-h-user-main">
        {children}
      </main>
    </>
  );
}
