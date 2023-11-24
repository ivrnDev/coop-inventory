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
          <TableRow className="whitespace-nowrap text-center text-sm md:text-lg">
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
              <TableRow key={index} className="max-md:text-center md:text-lg md:font-semibold">
                <TableCell className="relative w-20 h-2 md:w-28 md:h-28">
                  <Image
                    src={`data:image/png;base64,${product.display_image}`}
                    alt={product.product_name}
                    sizes="min-w-1"
                    fill
                    className="object-contain"
                  />
                </TableCell>
                <TableCell className="text-left line-clamp-2">
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
