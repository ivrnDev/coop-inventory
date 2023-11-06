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

export async function updateProduct(form: FormData, id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
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

export async function deleteProduct(productId: number) {
  if (productId) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/${productId}/delete`,
        {
          method: "PATCH",
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
        data: null
      };
    }
  }
}
