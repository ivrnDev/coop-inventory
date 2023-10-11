"use client";

import { createSlice } from "@reduxjs/toolkit";
import { ProductsType } from "@/types/products/products";
import { isDeepStrictEqual } from "util";
interface CartState {
  item: ProductsType[];
  itemNumber: number;
}

const initialState: CartState = {
  item: [],
  itemNumber: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItem: (state, action) => {
     const itemAlreadyExists = state.item.some(
       (item) => item.product_id === action.payload.product_id
     );

     if (!itemAlreadyExists) {
       state.item.push(action.payload);
       state.itemNumber = state.item.length;
     } else {
      return undefined
     }
    },
  },
});

export const { setItem } = cartSlice.actions;
export default cartSlice.reducer;
