import CreateOrderForm from "@/components/user/forms/CreateOrder";

type Params = {
  searchParams: { [key: string]: string[] | string | undefined };
};

const BuyPage = async ({ searchParams }: Params) => {
  return (
    <>
      <CreateOrderForm searchParams={searchParams} />
    </>
  );
};

export default BuyPage;
