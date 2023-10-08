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
