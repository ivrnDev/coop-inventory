import UpdateProductForm from "@/components/admin/products/forms/UpdateProduct";
import { Categories, Product } from "@/types/products/products";
import { getAllCategories } from "@/lib/api/categories";
import { getProductById } from "@/lib/api/products";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const UpdateProductPage = async ({ searchParams }: Params) => {
  const id = searchParams.id as string;
  const product: Product[] = await getProductById(id);
  const categories: Categories[] = await getAllCategories();
  return (
    <section className="h-fit px-9">
      <div className="flex flex-col gap-6">
        <UpdateProductForm categories={categories} id={id} />
      </div>
    </section>
  );
};

export default UpdateProductPage;
