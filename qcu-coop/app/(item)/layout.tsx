import CategoriesSidebar from "@/components/ui/header/Categories";
import HomeHeader from "@/components/ui/header/Home";
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
      <main className="home-main">{children}</main>
    </>
  );
}
