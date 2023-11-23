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
      <main className="bg-main-user mt-user-header-mobile h-user-main-mobile md:h-user-main md:mt-user-header overflow-y-hidden">
        {children}
      </main>
    </>
  );
}
