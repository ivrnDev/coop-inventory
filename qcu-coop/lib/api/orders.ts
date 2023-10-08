import { Data } from "@/types/orders/orders";

export async function createOrder(formData: Data) {
  try {
    const res = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return {
      status: 500, // You can use a suitable error status code
      data: null,
    };
  }
}
