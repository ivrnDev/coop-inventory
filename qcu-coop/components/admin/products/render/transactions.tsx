import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { TransactionsType } from "@/types/transactions/transactions";
import { getAllTransactions } from "@/lib/api/transaction";

const AdminRenderTransactions = async () => {
  const transactions: TransactionsType[] = await getAllTransactions();
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
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TableRow key={index} className="">
                <TableCell>{transaction.transaction_id}</TableCell>
                <TableCell className="capitalize">{transaction.customer_name}</TableCell>
                <TableCell>{transaction.customer_email}</TableCell>
                <TableCell>{transaction.customer_phone}</TableCell>
                <TableCell>
                  {transaction.payment_method === "cash"
                    ? "Over the Counter"
                    : "Online Payment"}
                </TableCell>
                <TableCell className="capitalize">{transaction.order_status}</TableCell>
                <TableCell>
                  <Link href={`./orders?${new URLSearchParams({id: String(transaction.transaction_id)})}`}> 
                    View
                  </Link>
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
