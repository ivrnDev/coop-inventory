import CartItem from "@/components/user/render/CartList";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const CartPage = ({ searchParams }: Props) => {
  const { cart } = searchParams;
  let itemId: number[] | undefined;
  if (typeof cart === "string") {
    itemId = JSON.parse(cart);
  }
  return (
   <CartItem productId={itemId}/>
  
  );
};

export default CartPage;
