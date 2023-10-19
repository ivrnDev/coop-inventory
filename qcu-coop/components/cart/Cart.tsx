"use client";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartNumber = useSelector((state: RootState) => state.cart.itemNumber);
  return (
    <>
      <Link href="/products/cart">
        <div className="relative w-10 h-10 object-contain">
          <Image src="/icons/cart.svg" alt="cart" fill />
        </div>
      </Link>

      <div className="text-white font-semibold text-[0.9rem] absolute top-0 left-4">
        {cartNumber}
      </div>
    </>
  );
};

export default Cart;
