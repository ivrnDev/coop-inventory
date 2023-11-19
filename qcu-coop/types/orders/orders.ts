import { ProductAlbum, Variant } from "../products/products";

export type Customer = {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  payment_method: string;
};

export type Order = {
  product_id: string;
  variant_id: string;
  quantity: string;
};

export type Data = {
  customer: Customer;
  orders: Order[];
};

export type OrderProduct = {
  product_id: number;
  product_name: string;
  display_name: string;
  display_price: string;
  product_stocks: number;
  product_description: string;
  status: string;
  isFeatured: number;
  isDeleted: number;
  date_created: string;
  display_image: any;
  category_id: number;
  category_name: string;
  category_image: any;
  albums: ProductAlbum[];
  variants: Variant[];
  variantPrice: number;
  quantity: number;
  amount: number;
};
