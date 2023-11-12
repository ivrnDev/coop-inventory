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
import { Button } from "@/components/ui/button";
import { updateTransactionStatus } from "@/lib/api/transaction";
import { useRouter } from "next/navigation";
import { TransactionsType } from "@/types/transactions/transactions";

type Props = {
  transactionById: TransactionsType;
};
export const UpdateTransactionStatus = ({ transactionById }: Props) => {
  const router = useRouter();

  const onSubmit = async (status: string | null) => {
    if (status) {
      try {
        const updateStatus = await updateTransactionStatus(
          status,
          transactionById.transaction_id
        );
        if (updateStatus.status === 200) {
          console.log("Status successfully updated");
        } else {
          console.error("Failed to update the status");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    router.refresh();
  };

  return (
    <>
      {transactionById.order_status === "cancelled" && (
        <Button onClick={() => onSubmit("pending")}>RESTORE</Button>
      )}

      {transactionById.order_status === "pending" && (
        <AlertDialog>
          <AlertDialogTrigger className="capitalize bg-green-400  p-4 rounded-md">
            {transactionById.order_status}
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
              <AlertDialogAction onClick={() => onSubmit("completed")}>
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
              <AlertDialogTitle>Do you want to make changes?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will update the transaction status to completed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onSubmit(null)}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {transactionById.order_status === "completed" && (
        <AlertDialog>
          <AlertDialogTrigger className="capitalize bg-red-400 p-3 rounded-md">
            Cancel Order
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do you want to make changes?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will cancel the transaction.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onSubmit("cancelled")}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
