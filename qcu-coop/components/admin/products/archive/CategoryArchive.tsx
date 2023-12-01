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
import { Trash2 } from "lucide-react";
import RestoreCategories from "../buttons/RestoreCategories";
import { getAllDeletedCategories } from "@/lib/api/categories";
import { DeletedCategories } from "@/types/products/products";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const TrashArchiveCategories = () => {
  const [deletedCategories, setDeletedCategories] = useState<
    DeletedCategories[]
  >([]);

  useEffect(() => {
    const getDeletedCategories = async () => {
      const deletedCategories: DeletedCategories[] =
        await getAllDeletedCategories();
      setDeletedCategories(deletedCategories);
    };
    getDeletedCategories();
  }, []);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" className="bg-red-600 rounded-md p-1 h-fit">
            <Trash2 color="white" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          {deletedCategories?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category ID</TableHead>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deletedCategories.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell>{category.category_id}</TableCell>
                    <TableCell>{category.category_name}</TableCell>
                    <TableCell>
                      <RestoreCategories categoryId={category.category_id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="font-semibold text-lg text-center">Empty Trash</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrashArchiveCategories;
