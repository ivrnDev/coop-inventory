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
import { TransactionsType } from "@/types/transactions/transactions";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Orders = async ({ searchParams }: Params) => {
  const transactionId = searchParams.id as string;
  const orders = transactionId ? await getOrdersById(transactionId) : null;
  const transactions: TransactionsType[] = await getAllTransactions();
  const transactionById: TransactionsType[] = transactions?.filter(
    (transaction) => String(transaction.transaction_id) === transactionId
  );
  return (
    <>
      <section className="h-admin-main p-5 w-[74%]">
        <div className="h-full w-full">
          <AdminRenderTransactions transactions={transactions} />
        </div>
      </section>
      <section className="">
        <AdminRenderOrders
          orders={orders}
          transactionById={transactionById[0]}
        />
      </section>
    </>
  );
};

export default Orders;
