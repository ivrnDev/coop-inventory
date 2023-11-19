export async function getAllProducts(
  category_name?: string | null,
  active?: boolean | null
) {
  let request = ``;
  category_name && active
    ? (request = `http://localhost:3000/api/products?category=${category_name}&active=true`)
    : category_name && !active
    ? (request = `http://localhost:3000/api/products?category=${category_name}`)
    : !category_name && active
    ? (request = `http://localhost:3000/api/products?active=true`)
    : (request = `http://localhost:3000/api/products`);

  try {
    const res = await fetch(request, {
      next: {
        revalidate: 0,
      },
    });
    const data = await res.json();
    return data.result;
  } catch (error) {
    return [];
  }
}

export async function getProductById(productId: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
      next: {
        revalidate: 0,
      },
    });

    const data = await res.json();
    return data.result;
  } catch (error) {
    return [];
  }
}

export async function getDeletedProducts() {
  try {
    const res = await fetch(`http://localhost:3000/api/products/deleted/list`, {
      next: {
        revalidate: 0,
      },
    });

    const data = await res.json();
    return data.result;
  } catch (error) {
    return [];
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

export async function deleteProduct(productId: number, isDeleted: string) {
  if (productId) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/${productId}/delete?action=${isDeleted}`,
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
        data: null,
      };
    }
  }
}

export async function getProductByFeatured() {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/featured/list`,
      {
        next: {
          revalidate: 0,
        },
      }
    );

    const data = await res.json();
    return data.result;
  } catch (error) {
    return [];
  }
}
