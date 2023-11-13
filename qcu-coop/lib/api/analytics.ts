export async function getOrderAnalytics() {
  try {
    const res = await fetch("http://localhost:3000/api/analytics/orders", {
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
