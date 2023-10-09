"use client";
import { ItemType } from "@/types/products/products";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState<ItemType[] | undefined>(undefined);
  // localStorage.clear();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCart) setCart(storedCart);
  }, []);

  return (
    <>
      <Link
        href={{
          pathname: "/products/cart",
          query: {
            cart: JSON.stringify(cart || []),
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
