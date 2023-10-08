import QuantityInput from "@/components/user/forms/Quantity";
import Item from "@/components/user/render/Item";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ItemPage = ({ searchParams }: Params) => {
  const id = searchParams?.id as string;
  const productVariant = searchParams?.variantId as string;
  const quantity = searchParams?.qty as string;
  return (
    <>
      {id && id !== "undefined" && (
        <Item id={id} productVariant={productVariant} qty={quantity}>
          <QuantityInput />
        </Item>
      )}
    </>
  );
};

export default ItemPage;
