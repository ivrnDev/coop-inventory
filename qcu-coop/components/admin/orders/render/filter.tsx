"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";

const TransactionFilter = () => {
  const searchParams = useSearchParams();
  const currentId = searchParams?.get("id");
  const currentFilter = searchParams.get("filter");
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams({ filter });

    if (currentId !== null) {
      params.append("id", currentId);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex space-x-6">
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
    </div>
  );
};

export default TransactionFilter;
