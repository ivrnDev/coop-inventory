import AdminRenderOrders from "@/components/admin/products/render/Orders";
import AdminRenderTransactions from "@/components/admin/products/render/Transactions";
import TransactionFilter from "@/components/admin/products/render/transactions/Filter";
import {
  getOrdersById,
  getTransactionByFilter,
  getTransactionById,
} from "@/lib/api/transaction";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Orders = async ({ searchParams }: Params) => {
  const transactionId = searchParams.id as string;
  const filter = searchParams.filter as string;

  const orders = transactionId && (await getOrdersById(transactionId));
  const transactions = filter && (await getTransactionByFilter(filter));
  const transactionById =
    orders && (await getTransactionById(String(orders[0].transaction_id)));

  return (
    <>
      <section className="">
        <TransactionFilter />
      </section>
      <section className="mt-10">
        <AdminRenderTransactions transactions={transactions} />
      </section>
      <section>
        <AdminRenderOrders orders={orders} transactionById={transactionById} />
      </section>
    </>
  );
};

export default Orders;
