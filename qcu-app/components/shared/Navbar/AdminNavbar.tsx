"use client";
import styles from "@/styles/layouts/admin.module.css";
import { adminMenu } from "@/constants/layout/admin";
import { AdminMenu } from "@/types/layout";
import Link from "next/link";
import Image from "next/image";

const AdminNavbar = () => {
  const { display, route }: AdminMenu = adminMenu;

  return (
    <header className={styles.header}>
      <div className={styles.image_container}>
        <Image
          src="/../images/qcu-logo.png"
          alt="logo"
          width={100}
          height={100}
        />
      </div>
      <nav className={styles.navbar}>
        {adminMenu &&
          display.map((value, index) => (
            <Link key={index} href={route[index]} className={styles.link}>
              {value}
            </Link>
          ))}
      </nav>
    </header>
  );
};

export default AdminNavbar;
