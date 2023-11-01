import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { deleteCategory, getCategoryById } from "@/lib/api/categories";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Permission from "../../Permission";
import { rolePermissions } from "@/lib/permission";
import { toast } from "@/components/ui/use-toast";
import { createActivity } from "@/lib/api/activity";

type DeleteButton = {
  remove: number;
};
type Props = {
  categoryId: number;
};
const DeleteButton = ({ categoryId }: Props) => {
  const deleteBtnRef = useRef<HTMLDivElement | null>(null);
  const { moderate } = rolePermissions;
  const [adminId, setadminId] = useState<number>(0);
  const [isAllowed, setisAllowed] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<DeleteButton>({
    defaultValues: {
      remove: 0,
    },
  });

  const handlePermission = (permission: boolean, admin?: number) => {
    if (permission) {
      setisAllowed(true);
      admin && setadminId(admin);
    }
    !isAllowed && deleteBtnRef.current && deleteBtnRef.current.click();
  };
  const onSubmit = async () => {
    if (isAllowed) {
      try {
        const getCategory = await getCategoryById(categoryId);
        const categoryName = getCategory[0].category_name;
        const removeCategory = await deleteCategory(1, categoryId);
        if (getCategory)
          await createActivity(
            { action: "deleted", target: "category", object: categoryName },
            adminId
          );
        if (removeCategory.status === 201) {
          toast({
            description: "Successfully deleted the category",
          });
        }
      } catch (error) {
        toast({
          description: "Failed to deleted the category",
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
        <DialogTrigger>
          <div
            ref={deleteBtnRef}
            className={classNames({
              "bg-red-500 text-white rounded-md p-2": true,
            })}
          >
            {isSubmitting ? "Deleting" : "Delete"}
          </div>
        </DialogTrigger>
        <DialogContent>
          <Permission roles={moderate} handlePermission={handlePermission} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteButton;
