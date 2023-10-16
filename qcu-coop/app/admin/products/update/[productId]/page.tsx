import UpdateProductForm from "@/components/admin/products/forms/UpdateProduct";
import { getProductById } from "@/lib/api/products";
import { ProductsType } from "@/types/products/products";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const UpdateProductPage = async ({searchParams}: Params) => {
  const id = searchParams.id as string;
  const product: ProductsType = await getProductById(id)
  return (
    <section className="w-[inherit] h-[calc(100vh-80px)] grid place-items-center">
      <UpdateProductForm  id={id}/>
    </section>
  );
};

export default UpdateProductPage;
