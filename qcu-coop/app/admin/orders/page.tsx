import AdminRenderOrders from "@/components/admin/orders/render/Orders";
import AdminRenderTransactions from "@/components/admin/orders/render/Transactions";

import { getAllTransactions, getOrdersById } from "@/lib/api/transaction";
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
      <section className="h-admin-main p-5 flex overflow-hidden">
        <div className="w-[70%]">
          <AdminRenderTransactions transactions={transactions} />
        </div>
        <div className="w-[30%]">
          <AdminRenderOrders
            orders={orders}
            transactionById={transactionById[0]}
          />
        </div>
      </section>
    </>
  );
};

export default Orders;
