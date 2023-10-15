import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AdminHeader = () => {
  return (
    <header className="bg-header-admin ml-[150px] w-[calc(100vw-150px)] px-10 h-20 flex items-center justify-between">
      <div className="w-fit">
        <p className="font-bold text-[1.2rem] ">Welcome, Admin</p>
        <p className=" text-[0.8rem] font-semilight">7 October 2023 | 11:59 GMT</p>
      </div>     
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search" />
          <Button type="submit">Search</Button>
        </div>
     
    </header>
  );
};

export default AdminHeader;
