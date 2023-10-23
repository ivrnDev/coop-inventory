import { TransactionOrdersType } from "@/types/transactions/transactions";
import { format } from "date-fns";
type Props = {
  orders: TransactionOrdersType[];
};

const AdminRenderOrders = ({ orders }: Props) => {
  if (orders.length === 0) {
    return <div>No orders available.</div>;
  }
  const order = orders[0];
  const transactionDate = new Date(order.date);
  return (
    orders &&
    orders.length > 0 && (
      <section className="fixed top-4 right-4 mt-admin-header-y h-[70%] w-[25%] rounded-sm border border-black p-3">
        <h1 className="font-semibold text-lg border-b-2 border-black">
          Order Details
        </h1>
        <p>Receipt No. {orders[0].transaction_id}</p>
        <p>Transaction Date: {format(transactionDate, "yyyy-MM-dd")}</p>
        <p>Transaction Time: {format(transactionDate, "HH:mm:ss")}</p>
        {orders.map((order, index) => (
          <>
          
            <p>{order.product_name}</p>
            <p>{order.variant_name}</p>
            <p>{order.order_total}</p>
          </>
        ))}
        <p>Total Amount: {orders[0].overall_total}</p>
      </section>
    )
  );
};

export default AdminRenderOrders;
