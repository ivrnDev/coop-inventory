"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  transactionId: number;
};

const ViewButton = ({ transactionId }: Props) => {
  const searchParams = useSearchParams();
  const parameters = searchParams.get("filter");
  const pathname = usePathname();
  let params = new URLSearchParams({ id: String(transactionId) });
  if (parameters !== null)
    params = new URLSearchParams({
      filter: parameters,
      id: String(transactionId),
    });

  return (
    <>
      <Link href={`${pathname}?${params.toString()}`}>View</Link>
    </>
  );
};

export default ViewButton;
