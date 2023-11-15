"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import classNames from "classnames";
const link = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    image: "/icons/dashboard-icon.svg",
  },
  {
    name: "Orders",
    href: "/admin/orders",
    image: "/icons/orders-icon.svg",
  },
  {
    name: "Products",
    href: "/admin/products",
    image: "/icons/products-icon.svg",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    image: "/icons/analytics-icon.svg",
  },
  {
    name: "Accounts",
    href: "/admin/accounts",
    image: "/icons/accounts-icon.svg",
  },
];

const AdminNavBar = () => {
  const pathname = usePathname();
  return (
    <nav
      className="h-screen w-admin-navbar fixed flex flex-col bottom-0 left-0 p-3 bg-slate-100 md:bg-navbar-admin 
      "
    >
      <div className="hidden md:flex flex-col justify-center items-center w-fit mb-5 space-y-4">
        <Link href="/admin/dashboard">
          <Image
            src="/images/qcu-logo.png"
            alt="QCU-Logo"
            width={65}
            height={65}
          />
        </Link>
        <h1 className="text-center font-bold text-xl text-white">
          QCU COOP STORE
        </h1>
      </div>
      <div className="grid grid-rows-6 gap-10">
        {link.map((value, index) => (
          <Link href={value.href} key={index}>
            <div className="flex items-center h-fit">
              <Image
                src={value.image}
                alt={value.name}
                width={25}
                height={25}
                
              />
              <p
                className={classNames({
                  "text-black": pathname === value.href,
                  "text-white": pathname !== value.href,
                  "font-bold text-lg capitalize ml-2": true,
                })}
              >
                {value.name}
              </p>
            </div>
          </Link>
        ))}
        <hr className="absolute w-full left-0 bottom-32" />
        <Link href="/">
          <div className="flex items-center h-fit ml-2">
            <Image
              src="/icons/logout-icon.svg"
              alt="logout-icon"
              width={25}
              height={25}
            />
            <p className="font-bold text-lg capitalize text-white ml-2">
              Logout
            </p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavBar;
