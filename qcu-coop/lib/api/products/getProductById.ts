

export async function getProductById(productId: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
      next: {
        revalidate: 0,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch Data");
    const data = await res.json();
    return data.result[0];
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
}
