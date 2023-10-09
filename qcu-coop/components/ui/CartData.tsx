"use client";
import { ItemType } from "@/types/products/products";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const cart: ItemType[] = JSON.parse(localStorage.getItem("cart") || "[]");
  // localStorage.clear();
  console.log(cart);
  return (
    <>
      <Link
        href={{
          pathname: "/products/cart",
          query: {
            cart: JSON.stringify(cart),
          },
        }}
      >
        <div className="relative w-10 h-10 object-contain">
          <Image src="/icons/cart.svg" alt="cart" fill />
        </div>
      </Link>
    </>
  );
};

export default Cart;
