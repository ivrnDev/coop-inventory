import CartItem from "@/components/cart/CartList";

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
