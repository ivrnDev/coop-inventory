"use client";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import { Dialog } from "@radix-ui/react-dialog";
import { rolePermissions } from "@/lib/permission";
// import RestoreButton from "../buttons/Restore";
import { Trash2 } from "lucide-react";
import { DeletedAdmin } from "@/types/admins/admins";
import RestoreButton from "../../products/buttons/Restore";

type Props = {
  deletedAdmin: DeletedAdmin[];
};

const TrashArchive = ({ deletedAdmin }: Props) => {
  const { restricted } = rolePermissions;
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="bg-red-600 rounded-md p-1">
            <Trash2 color="white" />
          </div>
        </DialogTrigger>
        <DialogContent>
          {deletedAdmin?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deletedAdmin.map((admin, index) => (
                  <TableRow key={index}>
                    <TableCell>{admin.admin_id}</TableCell>
                    <TableCell>{admin.admin_name}</TableCell>
                    <TableCell>{admin.admin_username}</TableCell>
                    <TableCell>
                      {
                        <RestoreButton
                          roles={restricted}
                          target={{
                            id: admin.admin_id,
                            object: admin.admin_name,
                            target: "account",
                          }}
                          message={{
                            success: `Sucessfully restore ${admin.admin_name} account`,
                            failed: `Failed to restore ${admin.admin_name} account`,
                          }}
                          deleteTarget="deleteAdmin"
                          isDeleted="0"
                        />
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <h1 className="font-semibold text-center text-lg">
              No Deleted Admin
            </h1>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrashArchive;
