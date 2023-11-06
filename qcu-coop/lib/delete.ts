import { deleteProduct } from "./api/products";

 const targetRequest: any = {
   deleteProduct: deleteProduct,
 };

export const handleAction = (id: number, deleteTarget: string): Promise<boolean> => {
  return new Promise(async (resolve) => {
    const request = targetRequest[deleteTarget]
    try {
      const result = await request(id);
      result && result.status === 200 ? resolve(true) : resolve(false);
    } catch (error) {
      resolve(false);
    }
  });
};

