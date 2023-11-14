"use client";
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
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type Params = {
  transactions: TransactionsType[] | null;
};

const AdminRenderTransactions = ({ transactions }: Params) => {
  const [filter, setFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const handleFilter = (filter: string) => {};

  const statusFiltered = transactions?.filter((transaction) => {
    if (statusFilter === "") return transaction;
    return transaction.order_status.includes(statusFilter.toLowerCase());
  });

  const filteredTransactions = statusFiltered?.filter((transaction) => {
    const { transaction_date, ...newAdmin } = transaction;
    const transactionValues = Object.values(newAdmin).join(" ").toLowerCase();

    return (
      transactionValues.includes(filter.toLowerCase()) ||
      format(new Date(transaction_date), "MMMM dd, yyyy")
        .toLowerCase()
        .includes(filter.toLowerCase()) ||
      format(new Date(transaction_date), "h:mm:ss b")
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
  });

  return (
    <>
      {/* <div className="flex space-x-6">
        <Button
          onClick={() => handleFilter("all")}
          className={classNames({
            "rounded-xl": true,
            "bg-green-600": currentFilter === "all",
          })}
        >
          All
        </Button>
        <Button
          onClick={() => handleFilter("pending")}
          className={classNames({
            "rounded-xl": true,
            "bg-green-600": currentFilter === "pending",
          })}
        >
          Pending
        </Button>
        <Button
          onClick={() => handleFilter("completed")}
          className={classNames({
            "rounded-xl": true,
            "bg-green-600": currentFilter === "completed",
          })}
        >
          Completed
        </Button>
        <Button
          onClick={() => handleFilter("cancelled")}
          className={classNames({
            "rounded-xl": true,
            "bg-green-600": currentFilter === "cancelled",
          })}
        >
          Cancelled
        </Button>
      </div> */}
      <Input value={filter} onChange={(e) => setFilter(e.target.value)} />

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
            {filteredTransactions && filteredTransactions.length > 0 ? (
              filteredTransactions?.map((transaction, index) => (
                <TableRow key={index} className="">
                  <TableCell>{transaction.transaction_id}</TableCell>
                  <TableCell className="capitalize">
                    {transaction.student_name}
                  </TableCell>
                  <TableCell>{transaction.student_email}</TableCell>
                  <TableCell>{transaction.student_phone}</TableCell>
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
                    {format(
                      new Date(transaction.transaction_date),
                      "h:mm:ss b"
                    )}
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
    </>
  );
};

export default AdminRenderTransactions;
