export async function createBanner(form: FormData) {
  try {
    const res = await fetch("http://localhost:3000/api/banners", {
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
export async function updateBanner(form: FormData) {
  try {
    const res = await fetch("http://localhost:3000/api/banners", {
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

export async function getAllBanners() {
  try {
    const res = await fetch(`http://localhost:3000/api/banners`, {
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
