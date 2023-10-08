import CreateOrderForm from "@/components/user/forms/CreateOrder";
import { getProductById } from "@/lib/api/products";
import { ItemType } from "@/types/products/products";

type Params = {
  searchParams: { [key: string]: string[] | string | undefined };
};

const BuyPage = async ({ searchParams }: Params) => {

  return (
    <>
      <CreateOrderForm searchParams={searchParams}/>
    </>
  );
};

export default BuyPage;
