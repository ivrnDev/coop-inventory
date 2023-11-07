import Item from "@/components/user/render/item/Item";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ItemPage = ({ searchParams }: Params) => {
  const product_id = searchParams?.id as string;
  const variant_id = searchParams?.variant as string;
  const quantity = searchParams?.quantity as string;
  const amount = searchParams?.amount as string;
  return (
    <>
      {product_id && (
        <Item
          searchParams={{
            product_id,
            variant_id,
            quantity,
            amount,
          }}
        />
      )}
    </>
  );
};

export default ItemPage;
