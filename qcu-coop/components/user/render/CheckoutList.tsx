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
        <TableHeader className="">
          <TableRow className="whitespace-nowrap text-sm">
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Item Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {orders && orders.length > 0 ? (
            orders.map((product, index) => (
              <TableRow key={index} className="text-center">
                <TableCell className="relative w-16 h-16">
                  <Image
                    src={`data:image/png;base64,${product.display_image}`}
                    alt={product.product_name}
                    sizes="min-w-1"
                    fill
                    className="object-contain"
                  />
                </TableCell>
                <TableCell className="text-left">
                  {product.display_name}
                </TableCell>
                <TableCell>{`₱ ${product.variantPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}</TableCell>
                <TableCell>{`${product.quantity}x`}</TableCell>
                <TableCell>{`₱ ${product.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}</TableCell>
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
