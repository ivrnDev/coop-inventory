"use client";
import styles from "@/styles/layouts/user.module.css";
import { userMenu } from "@/constants/layout/user";
import { UserMenu } from "@/types/layout";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "../Searchbar";

const Navbar = () => {
  const { display, route }: UserMenu = userMenu;

  return (
    <header className={styles.header}>
      <div className={styles.logo_container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/../images/qcu-logo.png"
              alt="LOGO"
              width={55}
              height={55}
            />
          </Link>
          <h1>QCU COOP STORE</h1>
        </div>
        <div className={styles.user_icon_container}>
          <Link href="/login">
            <Image
              src="../assets/icons/user-icon.svg"
              alt="user-icon"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>

      <nav className={styles.navbar}>
        <div>
          {userMenu &&
            display.map((menu, index) => (
              <Link key={index} href={route[index]} className={styles.link}>
                {menu}
              </Link>
            ))}
        </div>

        <Searchbar />
      </nav>
    </header>
  );
};

export default Navbar;
