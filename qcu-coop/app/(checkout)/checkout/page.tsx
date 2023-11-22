import CreateOrderForm from "@/components/user/forms/CreateOrder";
import CheckoutList from "@/components/user/render/CheckoutList";
import { getProductById } from "@/lib/api/products";

import { Order, OrderProduct } from "@/types/orders/orders";
import { Product } from "@/types/products/products";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Checkout = async ({ searchParams }: Params) => {
  const { order } = searchParams;

  const parsedOrders: Order[] = typeof order === "string" && JSON.parse(order);

  let orderArray: OrderProduct[] = [];
  if (parsedOrders) {
    for (const parsedOrder of parsedOrders) {
      if (parsedOrder && parsedOrder.product_id) {
        const product: Product[] = await getProductById(parsedOrder.product_id);
        const findVariant = product[0]?.variants.filter(
          (v) => v.variant_id === Number(parsedOrder.variant_id)
        );
        if (findVariant) {
          const insertOrderDetails = {
            ...product[0],
            quantity: Number(parsedOrder.quantity),
            amount:
              findVariant[0]?.variant_price * Number(parsedOrder.quantity),
            variantPrice: findVariant[0]?.variant_price ?? 0,
          };
          orderArray.push(insertOrderDetails);
        }
      }
    }
  }

  return (
    <>
      <section className="h-user-main-mobile mt-user-header-mobile pb-36 p-6 bg-yellow-500  overflow-hidden md:h-user-main md:mt-user-header md:py-10 md:px-7">
        <CreateOrderForm orders={parsedOrders} orderInfo={orderArray}>
          <CheckoutList orders={orderArray} />
        </CreateOrderForm>
      </section>
    </>
  );
};

export default Checkout;
