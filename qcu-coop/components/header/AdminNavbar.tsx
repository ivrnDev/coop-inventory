import Link from "next/link";
import Image from "next/image";

const link = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    image: "/icons/dashboard-icon.png",
  },
  {
    name: "Orders",
    href: "/admin/orders",
    image: "/icons/orders-icon.png",
  },
  {
    name: "Products",
    href: "/admin/products",
    image: "/icons/products-icon.png",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    image: "/icons/analytics-icon.png",
  },
  {
    name: "Accounts",
    href: "/admin/accounts",
    image: "/icons/accounts-icon.png",
  },
  {
    name: "Logout",
    href: "/",
    image: "/icons/logout-icon.png",
  },
];

const AdminNavBar = () => {
  return (
    <nav
      className="w-screen md:h-screen md:w-admin-navbar fixed flex md:flex-col justify-center md:justify-normal items-center bottom-0 left-0 md:top-0 py-2 md:p-4 bg-slate-100 md:bg-navbar-admin 
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
      <div className="flex md:flex-col space-x-10 md:space-x-0 justify-center items-center md:items-start md:space-y-6 p-2 w-[inherit]">
        {link.map((value, index) => (
          <Link href={value.href} key={index}>
            <div className="hidden md:flex flex-row-reverse gap-3 items-center">
              <p className="hidden md:inline font-bold text-lg uppercase">
                {value.name}
              </p>
              <div className="relative w-10 h-10">
                <Image
                  src={value.image}
                  alt={value.name}
                  sizes="(min-width: 2rem)"
                  fill
                  className="hover:animate-bounce md:hover:animate-none"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavBar;
