import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionsType } from "@/types/transactions/transactions";
import ViewButton from "./ViewOrder";
import { format } from "date-fns";

type Params = {
  transactions: TransactionsType[] | null;
};

const AdminRenderTransactions = async ({ transactions }: Params) => {
  return (
    <div className="border border-black w-[70%]">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Customer Phone</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TableRow key={index} className="">
                <TableCell>{transaction.transaction_id}</TableCell>
                <TableCell className="capitalize">
                  {transaction.customer_name}
                </TableCell>
                <TableCell>{transaction.customer_email}</TableCell>
                <TableCell>{transaction.customer_phone}</TableCell>
                <TableCell>
                  {transaction.payment_method === "cash"
                    ? "Over the Counter"
                    : "Online Payment"}
                </TableCell>
                <TableCell className="capitalize">
                  {transaction.order_status}
                </TableCell>
                <TableCell className="capitalize">
                  {format(
                    new Date(transaction.transaction_date),
                    "MMMM dd, yyyy"
                  )}
                </TableCell>
                <TableCell className="capitalize">
                  {format(new Date(transaction.transaction_date), "h:mm:ss b")}
                </TableCell>
                <TableCell>
                  <ViewButton transactionId={transaction.transaction_id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminRenderTransactions;
