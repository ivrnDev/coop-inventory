import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderProduct } from "@/types/orders/orders";
import Image from "next/image";

type Props = {
  orders: OrderProduct[];
};

const CheckoutList = ({ orders }: Props) => {
  return (
    <>
      <Table className="overflow-hidden">
        <TableHeader>
          <TableRow className="whitespace-nowrap text-sm">
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Item Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders && orders.length > 0 ? (
            orders.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="relative w-16 h-16">
                  <Image
                    src={`data:image/png;base64,${product.display_image}`}
                    alt={product.product_name}
                    sizes="min-w-1"
                    fill
                    className="object-contain"

                  />
                </TableCell>
                <TableCell>{product.display_name}</TableCell>
                <TableCell>{product.variantPrice}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.amount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CheckoutList;
