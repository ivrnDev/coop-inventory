import AdminRenderOrders from "@/components/admin/products/render/Orders";
import AdminRenderTransactions from "@/components/admin/products/render/Payments";
import React from "react";

const Orders = () => {
  return (
    <>
      <section>
        <AdminRenderTransactions />
      </section>
      <AdminRenderOrders/>
    </>
  );
};

export default Orders;
