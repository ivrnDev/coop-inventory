"use client";
import { RootState } from "../redux/store";
import { Product } from "@/types/products/products";
import { removeItem, setItem } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
type Props = {
  product: Product;
};

const AddtoCartButton = ({ product }: Props) => {
  const cart = useSelector((state: RootState) => state.cart.item);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (cart.some((value) => value.product_id === product.product_id)) {
      dispatch(removeItem(product.product_id));
    } else {
      dispatch(setItem(product));
    }
  };
  return (
    <>
      <Button
        variant="cart"
        className="w-full h-full flex items-center justify-center gap-4 md:gap-6 "
        onClick={handleAddToCart}
      >
        <Image src="/icons/cart-orange.svg" alt="cart" width={22} height={22} />
        {cart.some((value) => value.product_id === product.product_id)
          ? "Added to Cart"
          : "Add to Cart"}
      </Button>
    </>
  );
};

export default AddtoCartButton;
