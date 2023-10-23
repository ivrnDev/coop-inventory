import AdminRenderOrders from "@/components/admin/products/render/Orders";
import AdminRenderTransactions from "@/components/admin/products/render/transactions";
import { getOrdersById } from "@/lib/api/transaction";
import React from "react";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Orders = async ({ searchParams }: Params) => {
  const transactionId = searchParams.id as string;
  const orders = transactionId && (await getOrdersById(transactionId));

  return (
    <>
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
