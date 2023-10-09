"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Customer, Order } from "@/types/orders/orders";
import { createOrder } from "@/lib/api/orders";
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

type Data = {
  customer: Customer;
  orders: Order[];
};

const CreateOrderForm = ({ searchParams }: Props) => {
  const { qty, products } = searchParams;
  let order: Order | undefined;

  if (typeof products === "string") {
    try {
      order = JSON.parse(products);
      if (order && typeof order.product_id === "string") {
        order.product_id = parseInt(order.product_id, 10);
      }
      if (order && typeof order.quantity === "string") {
        order.quantity = parseInt(order.quantity, 10);
      }
      if (order && typeof order.variant_id === "string") {
        order.variant_id = parseInt(order.variant_id, 10);
      }
    } catch (error) {
      console.error("Error parsing products:", error);
    }
  }

  const initialOrders: Order[] = order
    ? [
        {
          product_id: (order.product_id as number) || 0,
          variant_id: (order.variant_id as number) || 0,
          quantity: (order.quantity as number) || 0,
        },
      ]
    : [];

  const [formData, setFormData] = useState<Data>({
    customer: {
      customer_name: "",
      customer_phone: "",
      customer_email: "",
      payment_method: "",
    },
    orders: initialOrders,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData({
      ...formData,
      customer: {
        ...formData.customer,
        [fieldName]: fieldValue,
      },
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createOrder(formData);

      if (response.status === 201) {
        console.log("Customer created successfully");
        setFormData({
          ...formData,
          customer: {
            customer_name: "",
            customer_phone: "",
            customer_email: "",
            payment_method: "",
          },
        });
        console.log(response.data);
      } else {
        console.error("Failed to create customer");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex place-items-center justify-center h-screen bg-slate-600">
      <div>
        <h1 className="text-center">CREATE CUSTOMER</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-red-500 p-10 flex flex-col gap-5 w-fit h-fit "
        >
          <div>
            <label>Name</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer.customer_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              type="text"
              name="customer_phone"
              value={formData.customer.customer_phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="text"
              name="customer_email"
              value={formData.customer.customer_email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Payment Method</label>
            <input
              type="text"
              name="payment_method"
              value={formData.customer.payment_method}
              onChange={handleChange}
            />
          </div>

          <button type="submit">CREATE NOW</button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrderForm;
