import CreateTransactions from "@/components/admin/products/forms/CreateTransactions";
import AdminRenderOrders from "@/components/admin/orders/render/Orders";
import AdminRenderTransactions from "@/components/admin/orders/render/Transactions";
// import TransactionFilter from "@/components/admin/orders/render/filter";
import { getAllProducts } from "@/lib/api/products";

import {
  getAllTransactions,
  getOrdersById,
  getTransactionByFilter,
  getTransactionById,
} from "@/lib/api/transaction";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Orders = async ({ searchParams }: Params) => {
  const transactionId = searchParams.id as string;
  // const filter = searchParams.filter as string;
  const orders = transactionId ? await getOrdersById(transactionId) : null;
  // const transactions = filter ? await getTransactionByFilter(filter) : null;
  const transactions = await getAllTransactions();
  const transactionById = orders
    ? await getTransactionById(String(orders[0]?.transaction_id))
    : null;
  return (
    <>
      <section>
        {/* <TransactionFilter /> */}
        <AdminRenderTransactions transactions={transactions} />
      </section>
      <section className="mt-10">
        {/* <AdminRenderTransactions transactions={transactions} /> */}
      </section>
      <section>
        <AdminRenderOrders orders={orders} transactionById={transactionById} />
      </section>
    </>
  );
};

export default Orders;
