import styles from "@/styles/header/admin.module.css";
import Link from "next/link";
import Image from "next/image";
const AdminHeader = () => {
  return (
    <header className={styles.header}>
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
        <div className={styles.link_container}>
          <Link href="/dashboard" className={styles.link}>
            Dashboard
          </Link>
          <Link href="/orders" className={styles.link}>
            Orders
          </Link>
          <Link href="/products" className={styles.link}>
            Products
          </Link>
          <Link href="/payments" className={styles.link}>
            Payments
          </Link>
          <Link href="/analytics" className={styles.link}>
            Analytics
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
