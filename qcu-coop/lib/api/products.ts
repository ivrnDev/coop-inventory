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

// export async function createProduct() {
//   const response = await fetch("http://localhost:3000/api/customers", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(),
//   });
// }
