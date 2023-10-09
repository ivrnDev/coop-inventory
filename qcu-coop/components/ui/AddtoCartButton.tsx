"use client";
import React from "react";
import { ItemType, ProductsType } from "@/types/products/products";

type Props = {
  product: ProductsType;
};

const AddtoCartButton = ({ product }: Props) => {
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const isAlreadyInCart = existingCart.some(
      (item: ItemType) => Number(item) === product.product_id
    );

    if (!isAlreadyInCart) {
      existingCart.push(product.product_id);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      alert("Item added to cart successfully");
    } else {
      alert("Item is already in the cart");
    }
  };

  return (
    <button
      className="bg-blue-700 font-semibold text-[0.9rem] text-white mx-1 rounded-md p-1 shadow-sm;"
      onClick={handleAddToCart}
    >
      ADD TO CART
    </button>
  );
};

export default AddtoCartButton;
