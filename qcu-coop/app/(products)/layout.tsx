import CategoriesSidebar from "@/components/header/CategoriesSidebar";
import HomeHeader from "@/components/header/HomeHeader";
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
      <aside className="aside-home">
        <CategoriesSidebar />
      </aside>
      <main className="home-main">{children}</main>
    </>
  );
}
