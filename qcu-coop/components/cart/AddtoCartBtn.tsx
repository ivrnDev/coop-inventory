"use client";
import { RootState } from "../redux/store";
import { ProductsType } from "@/types/products/products";
import { setItem } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "../ui/button";
type Props = {
  product: ProductsType;
};

const AddtoCartButton = ({ product }: Props) => {
  const [itemAdded, setItemAdded] = useState(0);
  const cart = useSelector((state: RootState) => state.cart.item);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (cart.some((value) => value.product_id === product.product_id)) {
      setItemAdded(1);
    } else {
      dispatch(setItem(product));
      setItemAdded(2);
    }
  };
  return (
    <>
      <Button variant="default" size="sm" onClick={handleAddToCart}>
        ADD TO CART
      </Button>

      {itemAdded === 1 && (
        <div className="bg-gray-100 shadow-lg fixed top-1/2 w-[20%] h-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center cursor-default p-5 rounded-lg">
          <p className="font-bold text-[1rem] text-center">
            ITEM IS ALREADY ADDED !
          </p>
          <button
            className="bg-green-400 w-10 h-10 p-2 font-semibold absolute bottom-0 right-0"
            onClick={() => setItemAdded(0)}
          >
            OK
          </button>
        </div>
      )}

      {itemAdded === 2 && (
        <div className="bg-gray-100 shadow-lg fixed top-1/2 w-[20%] h-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center cursor-default p-5 rounded-lg">
          <p className="font-bold text-[1rem] text-center">
            SUCCESSFULLY ADDED TO CART
          </p>
          <button
            className="bg-green-400 w-10 h-10 p-2 font-semibold absolute bottom-0 right-0"
            onClick={() => setItemAdded(0)}
          >
            OK
          </button>
        </div>
      )}
    </>
  );
};

export default AddtoCartButton;
