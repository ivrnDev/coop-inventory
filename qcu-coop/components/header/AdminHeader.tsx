import Link from "next/link";
import { Input } from "../ui/input";
import Image from "next/image";

const AdminHeader = () => {
  return (
    <header className="bg-header-admin p-4 flex justify-between items-center h-admin-header w-screen md:w-admin-header md:ml-admin-header ">
      <div className="flex space-x-2">
        <Link href="/">
          <Image
            src="/images/qcu-logo.png"
            alt="QCU-Logo"
            width={45}
            height={45}
            className="md:hidden"
          />
        </Link>
        <div className="w-fit">
          <p className="font-bold text-lg">Welcome, Admin</p>
          <p className=" font-semilight text-xs">7 October 2023 | 11:59 GMT</p>
        </div>
      </div>

      <div className="w-28 sm:w-60">
        <Input type="text" placeholder="Search" className="w-full" />
      </div>
    </header>
  );
};

export default AdminHeader;
