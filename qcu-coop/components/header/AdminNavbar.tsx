import Link from "next/link";
import Image from "next/image";
const AdminNavBar = () => {
  return (
    <nav
      className="w-screen lg:h-screen lg:w-admin-navbar fixed flex lg:flex-col justify-center lg:justify-normal items-center bottom-0 left-0 lg:top-0 py-2 lg:p-4 bg-slate-100 lg:bg-navbar-admin 
      "
    >
      <div className="hidden lg:flex flex-col justify-center items-center w-fit mb-5 space-y-4">
        <Link href="/">
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
      <div className="flex lg:flex-col space-x-10 lg:space-x-0 justify-center items-center lg:items-start lg:space-y-6 p-2 w-[inherit]">
        <Link href="/admin/dashboard">
          <div className="flex flex-row-reverse gap-3 items-center">
            <p className="hidden lg:inline font-bold text-lg uppercase">
              Dashboard
            </p>
            <div className="relative w-10 h-10">
              <Image
                src="/icons/dashboard-icon.png"
                alt="dashboard-icon"
                fill
                className="hover:animate-bounce lg:hover:animate-none"
              />
            </div>
          </div>
        </Link>
        <Link href="/admin/orders">
          <div className="flex flex-row-reverse gap-3 items-center ">
            <p className="hidden lg:inline font-bold text-lg uppercase">
              Orders
            </p>
            <div className="relative w-10 h-10">
              <Image
                src="/icons/orders-icon.png"
                alt="orders-icon"
                fill
                className="hover:animate-bounce lg:hover:animate-none"
              />
            </div>
          </div>
        </Link>
        <Link href="/admin/products">
          <div className="flex flex-row-reverse gap-3 items-center">
            <p className="hidden lg:inline font-bold text-lg uppercase">
              Products
            </p>
            <div className="relative w-10 h-10">
              <Image
                src="/icons/products-icon.png"
                alt="products-icon"
                fill
                className="hover:animate-bounce lg:hover:animate-none"
              />
            </div>
          </div>
        </Link>
        <Link href="/admin/payments">
          <div className="flex flex-row-reverse gap-3 items-center">
            <p className="hidden lg:inline font-bold text-lg uppercase">
              Payments
            </p>
            <div className="relative w-10 h-10 ">
              <Image
                src="/icons/payments-icon.png"
                alt="payments-icon"
                fill
                className="hover:animate-bounce lg:hover:animate-none"
              />
            </div>
          </div>
        </Link>
        <Link href="/admin/analytics">
          <div className="flex flex-row-reverse gap-3 items-center">
            <p className="hidden lg:inline font-bold text-lg uppercase">
              Analytics
            </p>
            <div className="relative w-10 h-10 ">
              <Image
                src="/icons/analytics-icon.png"
                alt="analytics-icon"
                fill
                className="hover:animate-bounce lg:hover:animate-none"
              />
            </div>
          </div>
        </Link>
        <Link href="/admin/accounts">
          <div className="flex flex-row-reverse gap-3 items-center">
            <p className="hidden lg:inline font-bold text-lg uppercase">
              Accounts
            </p>
            <div className="relative w-10 h-10">
              <Image
                src="/icons/accounts-icon.png"
                alt="accounts-icon"
                fill
                className="hover:animate-bounce lg:hover:animate-none"
              />
            </div>
          </div>
        </Link>
        <Link href="/">
          <div className="hidden lg:flex flex-row-reverse gap-3 items-center">
            <p className="hidden lg:inline font-bold text-lg uppercase">
              Logout
            </p>
            <div className="relative w-10 h-10">
              <Image
                src="/icons/logout-icon.png"
                alt="logout-icon"
                fill
                className="hover:animate-bounce lg:hover:animate-none"
              />
            </div>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavBar;
