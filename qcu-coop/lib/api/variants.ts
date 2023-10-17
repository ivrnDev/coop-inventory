import { VariantFormValue } from "@/types/form/products";

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
export async function createVariant(
  formData: VariantFormValue,
  id: string
) {
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

    if (!res.ok) throw new Error("Failed to create variants");
    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
}
