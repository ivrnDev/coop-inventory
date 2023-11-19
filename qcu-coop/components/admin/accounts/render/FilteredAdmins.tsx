"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Admin } from "@/types/admins/admins";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UpdateAccount from "../forms/UpdateAccount";

type Props = {
  admins: Admin[];
};
const FilteredAdmins = ({ admins }: Props) => {
  const [filter, setFilter] = useState<string>("");

  const filteredAdmins = admins?.filter((admin) => {
    const { profile_picture, ...newAdmin } = admin;
    const adminValues = Object.values(newAdmin).join(" ").toLowerCase();
    return adminValues.includes(filter.toLowerCase());
  });

  return (
    <>
      <div className="relative w-[30%]">
        <Search
          className="absolute top-[50%] left-2 translate-y-[-50%]"
          size="20"
        />
        <Input
          type="search"
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
          className="w-full h-full pl-8"
        />
      </div>
      {admins?.length > 0 ? (
        <Table className="mt-3">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Authority</TableHead>
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins?.map((admin, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-5 items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-clip">
                    <Image
                      src={`data:image/png;base64,${admin.profile_picture}`}
                      alt={admin.admin_name}
                      sizes="min-w-1"
                      fill
                    />
                  </div>
                  {admin.admin_name}
                </TableCell>
                <TableCell>{admin.admin_id}</TableCell>
                <TableCell>{admin.admin_username}</TableCell>
                <TableCell className="capitalize">{admin.role}</TableCell>
                <TableCell className="flex gap-3">
                  <Dialog>
                    <DialogTrigger className="bg-[#1E88E5] rounded-md p-1">
                      <Image
                        src="/icons/edit-icon.svg"
                        alt="edit"
                        width={20}
                        height={20}
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <UpdateAccount admin_id={admin.admin_id} />
                    </DialogContent>
                  </Dialog>
                  {/* <Dialog>
                  <DialogTrigger className="bg-[#FB392D] rounded-md p-1">
                    <Image
                      src="/icons/trash-icon.svg"
                      alt="edit"
                      width={20}
                      height={20}
                    />
                  </DialogTrigger>
                  <DialogContent></DialogContent>
                </Dialog> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <h1 className="absolute text-2xl font-semibold top-1/2 left-1/2 translate-x-[-50%]">
          There is no existing accounts
        </h1>
      )}
    </>
  );
};

export default FilteredAdmins;
