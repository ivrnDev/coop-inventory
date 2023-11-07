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
