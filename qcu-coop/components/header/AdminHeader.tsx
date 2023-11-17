import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CreateBannerForm from "../admin/banner/CreateBanner";
import UpdateBanner from "../admin/banner/UpdateBanner";

const AdminHeader = () => {
  return (
    <header className="bg-header-admin p-4 flex justify-between items-center h-admin-header w-admin-header ml-admin-header-x px-3">
      <div className="w-fit">
        <p className="font-bold text-2xl">Welcome, Admin</p>
        <p className=" font-light text-md text-center">
          {format(new Date(), "MMMM dd, yyyy")}
        </p>
      </div>
      <div className="justify-self-end ">
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button">Banners</Button>
          </DialogTrigger>
          <DialogContent>
            <CreateBannerForm />
            <UpdateBanner />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default AdminHeader;
