"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import classNames from "classnames";

type Props = {
  transactionId: number;
};

const ViewButton = ({ transactionId }: Props) => {
  const searchParams = useSearchParams();
  const currentId = searchParams.get("id");
  const parameters = searchParams.get("filter");
  const pathname = usePathname();
  const router = useRouter();
  const [selectedView, setselectedView] = useState(0);

  const handleClick = () => {
    let params = new URLSearchParams({ id: String(transactionId) });
    if (parameters !== null)
      params = new URLSearchParams({
        filter: parameters,
        id: String(transactionId),
      });
    router.push(`${pathname}?${String(params)}`);
    setselectedView(transactionId);
  };

  return (
    <>
      <Button
        onClick={() => handleClick()}
        className={classNames({
          "bg-green-600": selectedView === Number(currentId),
        })}
      >
        View
      </Button>
    </>
  );
};

export default ViewButton;
