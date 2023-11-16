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
        <div className="relative w-10 h-10 object-cover md:w-11 md:h-11">
          <Image
            src="/icons/cart.svg"
            alt="cart"
            sizes="min-w-1"
            fill
            className="mt-1"
          />
          <p className="text-black font-semibold text-[0.9rem] absolute top-[48%] left-[44%] translate-y-[-50%]">
            {cartNumber}
          </p>
        </div>
      </Link>
    </>
  );
};

export default Cart;
