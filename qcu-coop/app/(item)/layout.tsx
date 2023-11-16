import CategoriesSidebar from "@/components/header/Categories";
import HomeHeader from "@/components/header/Home";
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
      <main className="bg-main-user mt-user-header-mobile min-h-user-main-mobile md:min-h-user-main md:mt-user-header ">
        {children}
      </main>
    </>
  );
}
