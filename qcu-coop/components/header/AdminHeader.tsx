import Link from "next/link";
import { Input } from "../ui/input";
import Image from "next/image";
import { format } from "date-fns";

const AdminHeader = () => {
  return (
    <header className="bg-header-admin p-4 flex justify-between items-center h-admin-header w-screen md:w-admin-header md:ml-admin-header-x">
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
          <p className=" font-semilight text-xs">
            {format(new Date(), "MMMM dd, yyyy")}
          </p>
        </div>
      </div>

      <div className="w-28 sm:w-60">
        <Input type="text" placeholder="Search" className="w-full" />
      </div>
    </header>
  );
};

export default AdminHeader;
