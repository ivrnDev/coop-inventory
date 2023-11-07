import Image from "next/image";
import Link from "next/link";
import Cart from "../cart/Cart";
import "@/styles/globals.css";
import { Input } from "../ui/input";

const HomeHeader = () => {
  const navigationMobile = [
    { name: "products", link: "/products", src: "/icons/cube-icon.png" },
    { name: "home", link: "/", src: "/icons/home1-icon.png" },
    { name: "about", link: "/about", src: "/icons/about-icon.png" },
    { name: "user", link: "/login", src: "/icons/user-icon.svg" },
  ];
  const navigation = [
    { name: "home", link: "/", src: "/icons/home1-icon.png" },
    { name: "about", link: "/about", src: "/icons/about-icon.png" },
    { name: "products", link: "/products", src: "/icons/cube-icon.png" },
  ];

  return (
    <>
      <header className="max-md:bg-header-admin bg-white flex justify-between items-center p-2 md:py-3 md:px-6  h-user-header">
        <div className="flex space-x-3 items-center">
          <div className="relative w-12 h-12 md:w-18 md:h-18 object-fill">
            <Link href="/">
              <Image
                src="/images/qcu-logo.png"
                alt="QCU-Logo"
                width={50}
                height={50}
              />
            </Link>
          </div>
          <h1 className="font-bold text-lg md:text-xl text-white md:text-black">
            QCU COOP STORE
          </h1>
        </div>

        <div className="flex justify-center items-center space-x-4 z-50">
          <Input placeholder="Search" className="md:hidden w-[7.5rem]"></Input>
          <div className="relative md:hidden">
            <Cart />
          </div>
          <div className="hidden md:block">
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
      </header>

      <nav className="max-md:fixed left-0 bottom-0 bg-navbar-user md:bg-blue-600 w-screen h-user-navbar-mobile md:flex md:h-user-navbar md:justify-between">
        <div className="flex justify-around md:hidden">
          {navigationMobile.map((nav, index) => (
            <div key={index} className="">
              <Link href={nav.link}>
                <div className="relative w-10 h-10 hover:-translate-y-1 transition-all object-contain">
                  <Image src={nav.src} alt={nav.name} sizes="(min-width: 2rem)" fill />
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="hidden md:flex items-center h-full bg-green-300">
          {navigation.map((nav, index) => (
            <div
              key={index}
              className="bg-navbar-user h-full flex justify-center items-center p-5 hover:bg-blue-200"
            >
              <Link href={nav.link}>
                <p className="uppercase font-bold md:text-sm lg:text-xl">
                  {nav.name}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mr-9 space-x-7">
          <Input
            name="search"
            placeholder="Search"
            className="hidden md:block w-[250px]"
          ></Input>
          <div className="relative hidden md:block">
            <Cart />
          </div>
        </div>
      </nav>
    </>
  );
};

export default HomeHeader;
