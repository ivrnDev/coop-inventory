import AdminRenderOrders from "@/components/admin/products/render/transactions/Orders";
import TransactionFilter from "@/components/admin/products/render/transactions/filter";
import AdminRenderTransactions from "@/components/admin/products/render/transactions/transactions";
import { getOrdersById, getTransactionByFilter } from "@/lib/api/transaction";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Orders = async ({ searchParams }: Params) => {
  const transactionId = searchParams.id as string;
  const filter = searchParams.filter as string;
  const orders = transactionId && (await getOrdersById(transactionId));
  const transactions = filter && (await getTransactionByFilter(filter));
  return (
    <>
      <section>
        <TransactionFilter />
      </section>
      <section>
        <AdminRenderTransactions transactions={transactions} />
      </section>
      <section>
        <AdminRenderOrders orders={orders} />
      </section>
    </>
  );
};

export default Orders;
