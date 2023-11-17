"use client";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Permission from "../../Permission";
import { toast } from "@/components/ui/use-toast";
import { createActivity } from "@/lib/api/activity";
import { handleAction } from "@/lib/delete";

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
  isDeleted: string;
};
const RestoreButton = ({
  roles,
  target,
  message,
  deleteTarget,
  isDeleted,
}: Props) => {
  const restoreBtnRef = useRef<HTMLButtonElement | null>(null);
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
        const action = await handleAction(target.id, deleteTarget, isDeleted);
        if (action) {
          await createActivity(
            { action: "restore", target: target.target, object: target.object },
            adminId
          );
          return toast({
            description: `${message.success}`,
          });
        }
        return toast({
          variant: "destructive",
          title: `Failed to restore ${target.object}`,
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
          ref={restoreBtnRef}
          className="bg-gray-400 rounded-md p-2 flex gap-2 justify-center items-center text-white"
        >
          Restore
        </DialogTrigger>
        <DialogContent>
          <Permission roles={roles} handlePermission={handlePermission} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestoreButton;
