export async function getAllProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  return data.result;
}
