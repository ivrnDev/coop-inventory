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
import { addDays, format } from "date-fns";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CalendarRangePicker from "./OrderDateRange";
import { DateRange } from "react-day-picker";

type Params = {
  transactions: TransactionsType[] | null;
};

const AdminRenderTransactions = ({ transactions }: Params) => {
  const [filter, setFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleFilter = (filter: string) => {
    setStatusFilter(filter);
  };

  const onDateSelect = (selectedDate: DateRange) => {
    setDateRange(selectedDate);
  };

  const filteredByDate = transactions?.filter((transaction) => {
    const transactionDate = new Date(transaction.transaction_date);
    return (
      !dateRange ||
      (transactionDate >= (dateRange?.from ?? new Date(0)) &&
        transactionDate <= (dateRange?.to ?? new Date()))
    );
  });
  const filteredTransactions = filteredByDate?.filter((transaction) => {
    const { transaction_date, ...newAdmin } = transaction;
    const transactionValues = Object.values(newAdmin).join(" ").toLowerCase();

    return (
      (statusFilter === "all" ||
        transaction.order_status.includes(statusFilter.toLowerCase())) &&
      (transactionValues.includes(filter.toLowerCase()) ||
        format(new Date(transaction_date), "MMMM dd, yyyy")
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        format(new Date(transaction_date), "h:mm:ss b")
          .toLowerCase()
          .includes(filter.toLowerCase()))
    );
  });

  const isDateInRange = (transactionDate: Date): boolean => {
    if (!dateRange) return true;

    const { from, to } = dateRange;

    if (from && to) {
      return transactionDate >= from && transactionDate <= to;
    } else if (from) {
      return transactionDate >= from;
    } else if (to) {
      return transactionDate <= to;
    }

    return false;
  };

  return (
    <>
      <div id="filter-button-container" className="flex space-x-6">
        <Button
          onClick={() => handleFilter("all")}
          className={classNames({
            "rounded-xl": true,
            "bg-green-600": statusFilter === "all",
          })}
        >
          All
        </Button>
        <Button
          onClick={() => handleFilter("pending")}
          className={classNames({
            "rounded-xl": true,
            "bg-green-600": statusFilter === "pending",
          })}
        >
          Pending
        </Button>
        <Button
          onClick={() => handleFilter("completed")}
          className={classNames({
            "rounded-xl": true,
            "bg-green-600": statusFilter === "completed",
          })}
        >
          Completed
        </Button>
        <Button
          onClick={() => handleFilter("cancelled")}
          className={classNames({
            "rounded-xl": true,
            "bg-green-600": statusFilter === "cancelled",
          })}
        >
          Cancelled
        </Button>
        <Button
          onClick={() => handleFilter("rejected")}
          className={classNames({
            "rounded-xl": true,
            "bg-green-600": statusFilter === "rejected",
          })}
        >
          Rejected
        </Button>
      </div>

      <div
        id="table-container"
        className="h-full border border-black w-full mt-5 p-2"
      >
        <div id="table-upper-header" className="flex justify-between">
          <div className="w-1/2 h-8 relative">
            <Search
              className="absolute top-[50%] left-2 translate-y-[-50%]"
              size="20"
            />
            <Input
              type="search"
              placeholder="Search"
              onChange={(e) => setFilter(e.target.value)}
              className="w-full h-full pl-8"
            />
          </div>
          <CalendarRangePicker onDateSelect={onDateSelect} />
        </div>
        <Table className="h-[inherit]">
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
