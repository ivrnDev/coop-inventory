import AdminRenderOrders from "@/components/admin/products/render/transactions/Orders";
import TransactionFilter from "@/components/admin/products/render/transactions/filter";
import AdminRenderTransactions from "@/components/admin/products/render/transactions/transactions";
import { getOrdersById } from "@/lib/api/transaction";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Orders = async ({ searchParams }: Params) => {
  const transactionId = searchParams.id as string;

  const orders = transactionId && (await getOrdersById(transactionId));

  return (
    <>
      <section>
        <TransactionFilter />
      </section>
      <section>
        <AdminRenderTransactions />
      </section>
      <section>
        <AdminRenderOrders orders={orders} />
      </section>
    </>
  );
};

export default Orders;
