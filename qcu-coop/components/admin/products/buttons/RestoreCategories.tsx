"use client";
import { useEffect, useRef, useState } from "react";
import { deleteCategory, getCategoryById } from "@/lib/api/categories";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Permission from "../../Permission";
import { rolePermissions } from "@/lib/permission";
import { toast } from "@/components/ui/use-toast";
import { createActivity } from "@/lib/api/activity";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  categoryId: number;
};
const RestoreCategories = ({ categoryId }: Props) => {
  const router = useRouter();
  const restoreBtnRef = useRef<HTMLButtonElement | null>(null);
  const { restricted } = rolePermissions;
  const [adminId, setadminId] = useState<number>(0);
  const [isAllowed, setisAllowed] = useState<boolean>(false);

  const handlePermission = (permission: boolean, admin?: number) => {
    if (permission) {
      setisAllowed(true);
      admin && setadminId(admin);
    }
    !isAllowed && restoreBtnRef.current && restoreBtnRef.current.click();
  };
  const onSubmit = async () => {
    if (isAllowed) {
      try {
        const getCategory = await getCategoryById(categoryId);
        const categoryName = getCategory[0]?.category_name;
        const removeCategory = await deleteCategory(categoryId, 0);
        if (removeCategory.status === 200) {
          await createActivity(
            { action: "restore", target: "category", object: categoryName },
            adminId
          );
          toast({
            description: "Successfully restore the category",
          });
          router.refresh();
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: `Something went wrong.`,
        });
      }
    }
  };

  useEffect(() => {
    if (isAllowed) {
      onSubmit();
      setisAllowed(false);
    }
  }, [isAllowed]);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="bg-gray-400 rounded-md p-2 flex gap-2 justify-center items-center text-white"
            ref={restoreBtnRef}
          >
            Restore
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Permission roles={restricted} handlePermission={handlePermission} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RestoreCategories;
