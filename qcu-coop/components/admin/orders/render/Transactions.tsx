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

  const onDateSelect = (selectedDate: DateRange | undefined) => {
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
        format(new Date(transaction_date), "Pp")
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        format(new Date(transaction_date), "MMMM dd, yyyy")
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        format(new Date(transaction_date), "h:mm b")
          .toLowerCase()
          .includes(filter.toLowerCase()))
    );
  });

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
        className="border border-black rounded-md mt-6 p-3 mx-auto"
      >
        <div id="table-header" className="flex justify-between">
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
          <div className="relative">
            <CalendarRangePicker onDateSelect={onDateSelect} />
          </div>
        </div>
        <div className=" h-[21rem] overflow-y-auto mt-5">
          <Table>
            <TableHeader>
              <TableRow className="whitespace-nowrap">
                <TableHead>Transaction ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Checked Out</TableHead>
                <TableHead>Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-x-hidden">
              {filteredTransactions && filteredTransactions.length > 0 ? (
                filteredTransactions?.map((transaction, index) => (
                  <TableRow key={index} className="">
                    <TableCell>{transaction.transaction_id}</TableCell>
                    <TableCell className="capitalize whitespace-nowrap">
                      {transaction.student_name}
                    </TableCell>
                    <TableCell>
                      {transaction.payment_method === "cash"
                        ? "Over the Counter"
                        : "Online Payment"}
                    </TableCell>
                    <TableCell className="capitalize">
                      {transaction.order_status}
                    </TableCell>
                    <TableCell className="capitalize">
                      {format(new Date(transaction.transaction_date), "Pp")}
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
      </div>
    </>
  );
};

export default AdminRenderTransactions;
