import { ActivitiesForm } from "@/types/form/activity";

export async function createActivity(activity: ActivitiesForm, id: number) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/activity/recent/list?id=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      }
    );

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

export async function getAllActivities() {
  try {
    const res = await fetch(
      "http://localhost:3000/api/admin/activity/recent/list",
      {
        next: {
          revalidate: 0,
        },
      }
    );

    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
}
