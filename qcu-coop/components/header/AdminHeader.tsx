import { Input } from "../ui/input";

const AdminHeader = () => {
  return (
    <header className="bg-header-admin p-4 flex justify-between items-center h-admin-header w-screen md:w-admin-header md:ml-admin-header ">
      <div className="w-fit">
        <p className="font-bold text-lg">Welcome, Admin</p>
        <p className=" font-semilight text-xs">
          7 October 2023 | 11:59 GMT
        </p>
      </div>
      <div className="w-30 sm:w-60">
        <Input type="text" placeholder="Search" className="w-full" />
      </div>
    </header>
  );
};

export default AdminHeader;
