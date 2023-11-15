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
    return [];
  }
}
export async function getProductSales() {
  try {
    const res = await fetch("http://localhost:3000/api/analytics/products", {
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

export async function getSalesAnalytics() {
  try {
    const res = await fetch("http://localhost:3000/api/analytics/sales", {
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
