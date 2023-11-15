import {
  TransactionOrdersType,
  TransactionsType,
} from "@/types/transactions/transactions";
import { format } from "date-fns";
import UpdateTransactionStatus from "./UpdateTransactionStatus";
type Props = {
  orders: TransactionOrdersType[] | null;
  transactionById: TransactionsType | null;
};

const AdminRenderOrders = async ({ orders, transactionById }: Props) => {
  return (
    orders &&
    orders?.length > 0 && (
      <div className="fixed top-[43%] right-4 translate-y-[-50%] mt-admin-header-y h-[80%] w-[25%] rounded-xl border border-black p-3 flex flex-col space-y-5 overflow-y-auto overflow-x-hidden ">
        <h1 className="font-semibold text-lg border-b-2 border-black">
          Order Details
        </h1>
        <div className="flex justify-between">
          <div>
            <h2 className="font-semibold">Receipt No.</h2>
            <p className="text-sm"># {orders[0].transaction_id}</p>
          </div>
          <div>
            <p className="font-semibold text-center">Customer</p>
            <p className="text-sm">{transactionById?.student_name}</p>
          </div>
        </div>
        {transactionById?.payment_method !== "cash" && (
          <div>
            <h2 className="font-semibold">Reference Number.</h2>
            <p className="text-sm"># {transactionById?.reference_number}</p>
          </div>
        )}
        <div>
          <p className="font-semibold">Email:</p>
          <p className="text-sm">{transactionById?.student_email}</p>
        </div>
        <div>
          <p className="font-semibold">Phone:</p>
          <p className="text-sm">{transactionById?.student_phone}</p>
        </div>

        <div>
          <h2 className="float-left font-semibold">Pickup Date:</h2>
          <p className="float-right text-sm">
            {transactionById?.pickup_date
              ? format(new Date(transactionById.pickup_date), "MMMM dd, yyyy")
              : "Pickup date not available"}
          </p>
        </div>
        <div>
          <div className="grid grid-cols-3 space-x-10 font-semibold">
            <p>Items</p>
            <p>Variant</p>
            <p>Amount</p>
          </div>
          {orders.map((order, index) => (
            <div key={index} className="grid grid-cols-3 space-x-10 text-sm">
              <p className="">{`x${order.order_quantity} ${order.product_name}`}</p>
              <p className="text-center whitespace-nowrap">
                {order.variant_name}
              </p>
              <p className="text-right">{`₱ ${parseInt(
                order.order_total
              ).toFixed(2)}`}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="float-left font-bold">Total Amount: </h2>
          <p className="float-right text-sm">{`₱ ${Number(
            orders[0].overall_total
          ).toFixed(2)}`}</p>
        </div>
        <div className="w-full relative">
          {transactionById && (
            <UpdateTransactionStatus transactionById={transactionById} />
          )}
        </div>
      </div>
    )
  );
};

export default AdminRenderOrders;
