export async function getAllTransactions() {
  try {
    const res = await fetch("http://localhost:3000/api/transactions", {
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

export async function getOrdersById(transactionId: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/orders/transaction/list?transaction_id=${transactionId}`,
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

export async function getTransactionByFilter(filter: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/transactions/filter/list?filter=${filter}`,
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
