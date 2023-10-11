"use client";
import { ProductsType } from "@/types/products/products";
import Image from "next/image";
import { RootState } from "@/components/redux/store";
import { useSelector } from "react-redux";

const CartItem = async () => {
  const cart: ProductsType[] = useSelector((state: RootState) => state.cart.item);
  return (
    <section className="flex flex-col gap-5">
      {cart && cart.length > 0 ? cart.map((product, index) => (
        <div key={index} className="flex bg-white shadow-lg rounded-md h-fit ">
          <div className="relative w-20 h-20 object-contain">
            <Image
              src={`data:image/png;base64,${product.display_image}`}
              alt={product.product_name}
              fill
            />
          </div>
          <h2>{product.product_name}</h2>
          <p>{product.display_price}</p>
        </div>
      )):
      <div>NO ITEMS ADDED IN THE CART</div>}
    </section>
  );
};
export default CartItem;
