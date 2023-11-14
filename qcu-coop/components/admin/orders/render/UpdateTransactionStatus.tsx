"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateTransactionStatus } from "@/lib/api/transaction";
import { useRouter } from "next/navigation";
import { TransactionsType } from "@/types/transactions/transactions";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Permission from "@/components/admin/Permission";
import { rolePermissions } from "@/lib/permission";
import { createActivity } from "@/lib/api/activity";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  transactionById: TransactionsType;
};

const UpdateTransactionStatus = ({ transactionById }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const employeeRef = useRef<HTMLButtonElement | null>(null);
  const adminRef = useRef<HTMLButtonElement | null>(null);
  const { restricted, unrestricted } = rolePermissions;
  const [isAllowed, setIsAllowed] = useState(false);
  const [adminId, setadminId] = useState(0);
  const [status, setStatus] = useState<string>("");

  const handlePermissionEmployee = async (permission: boolean, id?: number) => {
    if (permission) {
      setIsAllowed(true);
      id && setadminId(id);
    }
    !isAllowed && employeeRef.current && employeeRef.current.click();
  };
  const handlePermissionAdmin = async (permission: boolean, id?: number) => {
    if (permission) {
      setIsAllowed(true);
      id && setadminId(id);
    }
    !isAllowed && adminRef.current && adminRef.current.click();
  };

  const onSubmit = async () => {
    if (isAllowed) {
      try {
        const updateStatus = await updateTransactionStatus(
          status,
          transactionById.transaction_id
        );
        if (updateStatus.status === 200) {
          await createActivity(
            {
              action:
                status === "pending"
                  ? "restore"
                  : status === "completed"
                  ? "confirmed"
                  : status,
              target: "transaction",
              object: String(transactionById.transaction_id),
            },
            adminId
          );
          toast({
            title: "Success",
            description: `You have successfully ${
              status === "pending"
                ? "restore"
                : status === "completed"
                ? "confirmed"
                : status
            } transaction order with Transaction No.${
              transactionById.transaction_id
            }!`,
          });
        } else {
          toast({
            variant: "destructive",
            title: `Failed to ${
              status === "pending"
                ? "restore"
                : status === "completed"
                ? "confirmed"
                : status
            } transactions `,
            description: `${updateStatus.data.message}`,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Internal Server Error.",
          description: `Something went wrong.`,
        });
      }
    }
    router.refresh();
  };

  useEffect(() => {
    if (isAllowed) {
      onSubmit();
      setIsAllowed(false);
    }
  }, [isAllowed, status]);

  return (
    <>
      {transactionById.order_status === "cancelled" ||
        (transactionById.order_status === "rejected" && (
          <AlertDialog>
            <AlertDialogTrigger className="capitalize bg-gray-400  p-4 rounded-md">
              RESTORE
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{`Do you want to restore this transaction?`}</AlertDialogTitle>
                <AlertDialogDescription>
                  {`This action will restore the Transaction No.${transactionById.transaction_id}.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    adminRef.current?.click();
                    setStatus("pending");
                  }}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}

      {transactionById.order_status === "pending" && (
        <AlertDialog>
          <AlertDialogTrigger className="capitalize bg-green-400  p-4 rounded-md">
            Confirm Order
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do you want to make changes?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will update the transaction status to completed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  employeeRef.current?.click();
                  setStatus("completed");
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {transactionById.order_status === "pending" && (
        <AlertDialog>
          <AlertDialogTrigger className="capitalize bg-red-400  p-4 rounded-md">
            REJECT
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to reject this order?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will reject the order.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  employeeRef.current?.click();
                  setStatus("rejected");
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {transactionById.order_status === "completed" && (
        <AlertDialog>
          <AlertDialogTrigger className="capitalize bg-red-400 p-3 rounded-md">
            Cancel
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you want to cancel the transaction?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will cancel the transaction and revert all changes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  adminRef.current?.click();
                  setStatus("cancelled");
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Dialog>
        <DialogTrigger ref={employeeRef}></DialogTrigger>
        <DialogContent>
          <Permission
            roles={unrestricted}
            handlePermission={handlePermissionEmployee}
          />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger ref={adminRef}></DialogTrigger>
        <DialogContent>
          <Permission
            roles={restricted}
            handlePermission={handlePermissionAdmin}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTransactionStatus;
