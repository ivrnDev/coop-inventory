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
      <main className="bg-main-user min-h-user-main-mobile md:min-h-user-main flex flex-col items-center justify-center space-y-5">
        {children}
      </main>
    </>
  );
}
