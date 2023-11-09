import { ValidateOrderData } from "@/middleware/zod/orders";

export async function createOrder(orders: ValidateOrderData) {
  try {
    const res = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orders),
    });

    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Failed to create order", error);
    return [];
  }
}
