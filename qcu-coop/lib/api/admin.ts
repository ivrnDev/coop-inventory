export async function adminPermission(roles: string[], password: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/permission/list?password=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roles: roles }),
      }
    );

    if (!res.ok) throw new Error("Failed to send Data");
    const data = await res.json();
    return {
      status: res.status,
      data: data.result,
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return {
      status: 500,
      data: null,
    };
  }
}

export async function loginAdmin(
  admin_username: string,
  admin_password: string
) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/verify/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin_username, admin_password }),
      }
    );

    const data = await res.json();
    return {
      status: res.status,
      data: data.result,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
}

export async function updateLogin(
  admin_username: string,
  admin_password: string
) {
  try {
    const res = await fetch(`http://localhost:3000/api/admin/login/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ admin_username, admin_password }),
    });

    const data = await res.json();
    return {
      status: res.status,
      data: data.result,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
}

export async function createAdmin(form: FormData) {
  try {
    const res = await fetch("http://localhost:3000/api/admin", {
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

export async function updateAdmin(form: FormData, id: number) {
  try {
    const res = await fetch(`http://localhost:3000/api/admin/${id}`, {
      method: "PATCH",
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

export async function getAllAdmin() {
  try {
    const res = await fetch("http://localhost:3000/api/admin", {
      next: {
        revalidate: 0,
      },
    });

    const data = await res.json();
    return data.result;
  } catch (error) {
    return null;
  }
}

export async function getAdminByID(id: number) {
  try {
    const res = await fetch(`http://localhost:3000/api/admin/list/${id}`, {
      next: {
        revalidate: 0,
      },
    });

    const data = await res.json();
    return data.result;
  } catch (error) {
    return null;
  }
}
