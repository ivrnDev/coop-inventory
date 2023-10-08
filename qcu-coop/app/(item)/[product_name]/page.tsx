import Item from "@/components/user/render/Item";
import React from "react";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ItemPage = ({ searchParams }: Params) => {
  const id = searchParams.id as string;
  return (
    <>
      <Item productId={id} />
    </>
  );
};

export default ItemPage;
