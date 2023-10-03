"use server";
export const getAllProducts = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/products");
    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
