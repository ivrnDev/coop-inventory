import Image from "next/image";
import Link from "next/link";
import Cart from "../cart/Cart";
import "@/styles/globals.css";

const HomeHeader = () => {
  return (
    <header className="bg-header-admin flex justify-between items-center p-3 px-5 h-user-headerz">
        <div className="flex space-x-3 items-center">
          <Link href="/">
            <Image
              src="/images/qcu-logo.png"
              alt="QCU-Logo"
              width={60}
              height={60}
            />
          </Link>
          <h1 className="font-bold text-lg">QCU COOP STORE</h1>
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
      </header>
      // <nav className="">
      //   <div className="">
      //     <Link href="/" className="">
      //       HOME
      //     </Link>
      //     <Link href="/about" className={styles.link}>
      //       ABOUT
      //     </Link>
      //     <Link href="/products" className={styles.link}>
      //       PRODUCTS
      //     </Link>
      //   </div>
      //   <div className="relative">
      //     <Cart />
      //   </div>
      // </nav>
  );
};

export default HomeHeader;
