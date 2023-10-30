export async function adminPermission(roles: string[], password: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/permission/list?password=${password}`,
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({roles: roles}), 
      }
    );

    if (!res.ok) throw new Error("Failed to fetch Data");
    const data = await res.json();
    return {
      status: res.status,
      data
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return {
      status: 500,
      data: null,
    };
  }
}
