import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HeaderProps } from "@/types/layout";
import Searchbar from "../Searchbar";

const Header: React.FC<HeaderProps> = ({
  menu,
  title,
  logoSrc,
  logoAlt,
  logoWidth,
  logoHeight,
  styles,
  isUser,
}: HeaderProps) => {
  const { display, route } = menu;

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={logoWidth}
              height={logoHeight}
            />
          </Link>
          <h1>{title}</h1>
        </div>
        {isUser && (
          <Link href="/login">
            <Image
              src="../assets/icons/user-icon.svg"
              alt="user-icon"
              width={40}
              height={40}
            />
          </Link>
        )}
      </div>

      <nav className={styles.navbar}>
        <div>
          {menu &&
            display.map((menuText, index) => (
              <Link key={index} href={route[index]} className={styles.link}>
                {menuText}
              </Link>
            ))}
        </div>

        {isUser && <Searchbar />}
      </nav>
    </header>
  );
};

export default Header;
