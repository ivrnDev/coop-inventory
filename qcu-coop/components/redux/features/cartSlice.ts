"use client";

import { Product} from "@/types/products/products";
import { createSlice } from "@reduxjs/toolkit";
interface CartState {
  item: Product[];
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
        return undefined;
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.item.findIndex(
        (item) => item.product_id === action.payload
      );

      if (itemIndex !== -1) {
        state.item.splice(itemIndex, 1); 
        state.itemNumber = state.item.length
      }
    },
  },
});

export const { setItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
