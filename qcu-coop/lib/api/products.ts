export async function getAllProducts() {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      next: {
        revalidate: 0,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch Data");

    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
}

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
