import Item from "@/components/user/render/Item";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ItemPage = ({ searchParams }: Params) => {
  const id = searchParams?.id as string;
  const productVariant = searchParams?.variant as string;
  return (
    <>
      {id && id !== "undefined" && (
        <Item id={id} productVariant={productVariant} />
      )}
    </>
  );
};

export default ItemPage;
