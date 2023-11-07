import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateOrderForm from "@/components/user/forms/CreateOrder";
import { getProductById } from "@/lib/api/products";
import { ValidateOrder } from "@/middleware/zod/orders";
import { Order } from "@/types/orders/orders";
import { Product } from "@/types/products/products";
import Image from "next/image";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Checkout = async ({ searchParams }: Params) => {
  const { order } = searchParams;
  const parsedOrders: Order[] = typeof order === "string" && JSON.parse(order);
  let orderArray = [];
  for (const parsedOrder of parsedOrders) {
    if (parsedOrder && parsedOrder.product_id) {
      const product: Product[] = await getProductById(parsedOrder.product_id);
      const findVariant = product[0].variants.filter(
        (v) => v.variant_id === Number(parsedOrder.variant_id)
      );
      const insertOrderDetails = {
        ...product[0],
        quantity: parsedOrder.quantity,
        amount: findVariant[0].variant_price * Number(parsedOrder.quantity),
        variantPrice: findVariant[0].variant_price,
      };
      orderArray.push(insertOrderDetails);
    }
  }
  console.log(orderArray);

  return (
    <>
      <section className="bg-green-500 mt-20">
        <h2>Personal Information</h2>
        <CreateOrderForm orders={parsedOrders} />
      </section>
      <section className="bg-white rounded-md">
        <h1>Products Ordered</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Item Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderArray && orderArray.length > 0 ? (
              orderArray.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Image
                      src={`data:image/png;base64,${product.display_image}`}
                      alt={product.product_name}
                      width="70"
                      height="70"
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
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Checkout;
