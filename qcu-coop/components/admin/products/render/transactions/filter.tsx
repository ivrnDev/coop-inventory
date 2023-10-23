"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";
import { useState } from "react";

const TransactionFilter = () => {
  const searchParams = useSearchParams();
  const parameters = searchParams.get("id");
  const router = useRouter();
  const pathname = usePathname();
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams({ filter });

    if (parameters !== null) {
      params.append("id", parameters);
    }

    router.push(`${pathname}?${params.toString()}`);
    setSelectedFilter(filter);
  };

  return (
    <div className="flex space-x-6">
      <Button
        onClick={() => handleFilter("all")}
        className={classNames({
          "rounded-xl": true,
          "bg-green-600": selectedFilter === "all",
        })}
      >
        All
      </Button>
      <Button
        onClick={() => handleFilter("pending")}
        className={classNames({
          "rounded-xl": true,
          "bg-green-600": selectedFilter === "pending",
        })}
      >
        Pending
      </Button>
      <Button
        onClick={() => handleFilter("completed")}
        className={classNames({
          "rounded-xl": true,
          "bg-green-600": selectedFilter === "completed",
        })}
      >
        Completed
      </Button>
      <Button
        onClick={() => handleFilter("cancelled")}
        className={classNames({
          "rounded-xl": true,
          "bg-green-600": selectedFilter === "cancelled",
        })}
      >
        Cancelled
      </Button>
    </div>
  );
};

export default TransactionFilter;
