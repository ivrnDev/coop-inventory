"use client";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Permission from "../../Permission";
import { toast } from "@/components/ui/use-toast";
import { createActivity } from "@/lib/api/activity";
import { handleAction } from "@/lib/delete";
import Image from "next/image";
type Props = {
  roles: string[];
  target: {
    id: number;
    object: string;
    target: string;
  };
  message: {
    success: string;
    failed: string;
  };
  deleteTarget: string;
};
const DeleteButton = ({ roles, target, message, deleteTarget }: Props) => {
  const deleteBtnRef = useRef<HTMLButtonElement | null>(null);
  const [adminId, setadminId] = useState<number>(0);
  const [isAllowed, setisAllowed] = useState<boolean>(false);

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
        const action = await handleAction(target.id, deleteTarget);
        if (action) {
          await createActivity(
            { action: "deleted", target: target.target, object: target.object },
            adminId
          );
          return toast({
            description: `${message.success}`,
          });
        }
        return toast({
          variant: "destructive",
          title: `Failed to delete ${target.object}`,
          description: `${message.failed}`,
        });
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
    <div>
      <Dialog>
        <DialogTrigger
          ref={deleteBtnRef}
          className="bg-[#FB392D] rounded-md p-2 flex gap-2 justify-center items-center text-white"
        >
          <Image
            src="/icons/trash-icon.svg"
            alt="edit"
            width={20}
            height={20}
          />
          Delete
        </DialogTrigger>
        <DialogContent>
          <Permission roles={roles} handlePermission={handlePermission} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteButton;
