import styles from "@/styles/ui/header/admin.module.css";
import Link from "next/link";
import Image from "next/image";
const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.logo_container}>
          <Link href="/">
            <Image
              src="/images/qcu-logo.png"
              alt="QCU-Logo"
              width={65}
              height={65}
            />
          </Link>
          <h1>QCU COOP STORE</h1>
        </div>

        <nav className={styles.navbar}>
          
            <Link href="/admin/dashboard" className={styles.link}>
              Dashboard
            </Link>
            <Link href="/admin/orders" className={styles.link}>
              Orders
            </Link>
            <Link href="/admin/products" className={styles.link}>
              Products
            </Link>
            <Link href="/admin/payments" className={styles.link}>
              Payments
            </Link>
            <Link href="/admin/analytics" className={styles.link}>
              Analytics
            </Link>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
