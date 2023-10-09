import styles from "@/styles/ui/header/home.module.css";
import Image from "next/image";
import Link from "next/link";
import QuantityInput from "../user/forms/Quantity";
import Cart from "../ui/CartData";

const HomeHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.top_header}>
        <div className={styles.logo_container}>
          <Link href="/">
            <Image
              src="/images/qcu-logo.png"
              alt="QCU-Logo"
              width={60}
              height={60}
            />
          </Link>
          <h1>QCU COOP STORE</h1>
        </div>

        <div>
          <Link href="/login">
            <Image
              src="/icons/user-icon.svg"
              alt="user-icon"
              width={50}
              height={50}
            />
          </Link>
        </div>
      </div>

      <nav className={styles.navbar}>
        <div className={styles.link_container}>
          <Link href="/" className={styles.link}>
            HOME
          </Link>
          <Link href="/about" className={styles.link}>
            ABOUT
          </Link>
          <Link href="/products" className={styles.link}>
            PRODUCTS
          </Link>
        </div>
        <div>
          <Cart />
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
