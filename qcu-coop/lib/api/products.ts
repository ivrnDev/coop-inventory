import { ProductFormValues } from "@/types/form/products";
import { ProductsType } from "@/types/products/products";
import { UpdateProductSchema } from "@/middleware/zod/updateProducts";

export async function getAllProducts() {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      next: {
        revalidate: 0,
      },
    });

    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
}

export async function getProductById(productId: string) {
  if (productId) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/${productId}`,
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
}

export async function createProduct(form: FormData) {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
}

export async function updateProduct(form: any, id: string) {
  console.log(form);
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
}
export async function updateProductImage(form: FormData, id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/image/${id}`, {
      method: "PATCH",
      body: form,
    });
    const data = await res.json();
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
}
