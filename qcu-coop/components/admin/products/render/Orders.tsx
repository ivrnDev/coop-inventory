import {
  TransactionOrdersType,
  TransactionsType,
} from "@/types/transactions/transactions";
import { format } from "date-fns";
import { UpdateTransactionStatus } from "./transactions/UpdateTransactionStatus";
type Props = {
  orders: TransactionOrdersType[];
  transactionById: TransactionsType;
};

const AdminRenderOrders = async ({ orders, transactionById }: Props) => {
  return (
    orders &&
    orders.length > 0 && (
      <section className="fixed top-4 right-4 mt-admin-header-y h-[70%] w-[25%] rounded-xl border border-black p-3 flex flex-col space-y-5">
        <h1 className="font-semibold text-lg border-b-2 border-black">
          Order Details
        </h1>
        <div>
          <h2>Receipt No.</h2>
          <p>#{orders[0].transaction_id}</p>
        </div>
        {transactionById.payment_method !== "cash" && (
          <div>
            <h2>Reference Number.</h2>
            <p>#{transactionById.reference_number}</p>
          </div>
        )}

        <div className="flex flex-col">
          <div>
            <h2 className="float-left">Pickup Date:</h2>
            <h2 className="float-right">Time: </h2>
          </div>
          <div className="">
            <p className="float-left">
              {format(new Date(transactionById.pickup_date), "MMMM dd, yyyy")}
            </p>
            <p className="float-right">
             
            </p>
          </div>
        </div>
        <div>
          <h2>Items Purchased:</h2>
          {orders.map((order, index) => (
            <div key={index} className="grid grid-cols-3 space-x-10 text-sm">
              <p className="">{`x${order.order_quantity} ${order.product_name}`}</p>
              <p className="text-center">{order.variant_name}</p>
              <p className="text-right">{order.order_total}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="float-left">Total Amount: </h2>
          <p className="float-right text-sm">{orders[0].overall_total}</p>
        </div>
        <div>
          <UpdateTransactionStatus transactionById={transactionById} />
        </div>
      </section>
    )
  );
};

export default AdminRenderOrders;
