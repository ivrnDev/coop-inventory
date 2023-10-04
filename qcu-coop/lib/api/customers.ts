import { CustomerType } from "@/types/customers/customers";

export async function createCustomer(formData: CustomerType) {
  try {
    const res = await fetch("http://localhost:3000/api/customers", {
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
