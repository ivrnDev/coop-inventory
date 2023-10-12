import CartItem from "@/components/cart/CartList";
import { Order } from "@/types/orders/orders";

type Props = {
  searchParams: { [key: string]: string[] | undefined };
};

const CartPage = ({ searchParams }: Props) => {
  return (
    <>
      <CartItem />
    </>
  );
};

export default CartPage;
