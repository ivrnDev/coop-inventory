import { Variant } from "@/types/products/products";
import { ValidateVariant } from "@/middleware/zod/variant";

export async function getVariantById(variantId: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/variant/list/${variantId}`,
      {
        next: {
          revalidate: 0,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch Data");
    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
}
export async function getVariantByProductId(productId: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/variant/list/item?product_id=${productId}`,
      {
        next: {
          revalidate: 0,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch Data");
    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
}
export async function createVariant(formData: Variant[], id: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/variant/list/new/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
}
export async function updateVariant(formData: ValidateVariant, id: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/variant/list/${id}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return {
      status: 500,
      data: []
    };
  }
}
export async function deleteVariant(productId: string, variantId: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/variant/list?product_id=${productId}&variant_id=${variantId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
}
