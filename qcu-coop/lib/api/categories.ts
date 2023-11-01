export async function createCategory(form: FormData) {
  try {
    const res = await fetch("http://localhost:3000/api/products/category", {
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
export async function updateCategory(form: FormData, id: number) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/category/${id}`,
      {
        method: "PATCH",
        body: form,
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
export async function deleteCategory(action: number, id: number) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/category/action/${id}?remove=${action}`,
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

export async function getAllCategories() {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/category/list`,
      {
        next: {
          revalidate: 0,
        },
      }
    );

    const data = await res.json();
    return {
      status: res.status,
      data
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return {
      status: 500,
      data: null
    };
  }
}
export async function getCategoryById(id: number) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/category/${id}`,
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
