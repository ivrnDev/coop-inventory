import AdminNavbar from "@/components/shared/Navbar/AdminNavbar";
import "@/styles/globals.css";

export const metadata = {
  title: "QCU-COOP Administrator",
  description: "Administrator Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminNavbar />
        <main className="admin_main">{children}</main>
      </body>
    </html>
  );
}
