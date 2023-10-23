"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";

type Props = {
  transactionId: number;
};

const ViewButton = ({ transactionId }: Props) => {
  const searchParams = useSearchParams();
  const currentId = searchParams.get("id");
  const currentFilter = searchParams.get("filter");
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    let params = new URLSearchParams({ id: String(transactionId) });
    if (currentFilter !== null)
      params = new URLSearchParams({
        filter: currentFilter,
        id: String(transactionId),
      });
    router.push(`${pathname}?${String(params)}`);
  };

  return (
    <>
      <Button
        onClick={() => handleClick()}
        className={classNames({
          "bg-green-600": Number(currentId) === transactionId,
        })}
      >
        View
      </Button>
    </>
  );
};

export default ViewButton;
