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
      <main className=" bg-gray-700 h-user-main md:h-user-main-mobile">{children}</main>
    </>
  );
}
