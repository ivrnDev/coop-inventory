"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TransactionFilter = () => {
  const searchParams = useSearchParams();
  const parameters = searchParams.get("id");
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams({ filter });

    if (parameters !== null) {
      params.append("id", parameters);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex space-x-6">
      <Button
        variant="default"
        className="rounded-xl"
        onClick={() => handleFilter("all")}
      >
        All
      </Button>
      <Button
        variant="default"
        className="rounded-xl"
        onClick={() => handleFilter("pending")}
      >
        Pending
      </Button>
      <Button
        variant="default"
        className="rounded-xl"
        onClick={() => handleFilter("completed")}
      >
        Completed
      </Button>
      <Button
        variant="default"
        className="rounded-xl"
        onClick={() => handleFilter("cancelled")}
      >
        Cancelled
      </Button>
    </div>
  );
};

export default TransactionFilter;
