"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
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
  const { products } = searchParams;

  let initialOrders: Order[] = [];
  if (products && typeof products === "string") {
    try {
      const parsedProducts = JSON.parse(products);

      if (Array.isArray(parsedProducts)) {
        initialOrders = parsedProducts
          .map((product) => {
            if (product.product_id && product.variant_id && product.quantity) {
              return {
                product_id: parseInt(product.product_id, 10),
                variant_id: parseInt(product.variant_id, 10),
                quantity: parseInt(product.quantity, 10),
              };
            }
            return null;
          })
          .filter((order): order is Order => order !== null);
      }
      // If parsedProducts is a single object, process it accordingly
      else if (
        parsedProducts.product_id &&
        parsedProducts.variant_id &&
        parsedProducts.quantity
      ) {
        initialOrders = [
          {
            product_id: parseInt(parsedProducts.product_id, 10),
            variant_id: parseInt(parsedProducts.variant_id, 10),
            quantity: parseInt(parsedProducts.quantity, 10),
          },
        ];
      }
    } catch (error) {
      console.error("Error parsing products:", error);
    }
  }

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
    console.log(formData)

    if (
      !formData ||
      formData.customer.customer_name === "" ||
      formData.orders.length === 0
    ) {
      console.error("Invalid customer or orders data");
      return;
    }

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
