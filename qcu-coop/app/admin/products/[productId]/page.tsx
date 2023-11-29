import UpdateProductForm from "@/components/admin/products/forms/UpdateProduct";
import { Categories, Product, Products } from "@/types/products/products";
import { getAllCategories } from "@/lib/api/categories";
import { getAllProducts, getProductById } from "@/lib/api/products";
import { Suspense } from "react";

type Params = {
  params: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const products: Products[] = await getAllProducts();

  return products.map((p) => ({ productId: String(p.product_id) }));
}

const UpdateProductPage = async ({ params }: Params) => {
  const id = params?.productId as string;
  const categories: Categories[] = await getAllCategories();

  return (
    <section className="h-admin-main p-10 overflow-auto">
      <div className="h-full border-black border rounded-md bg-white overflow-y-auto">
        <div className="bg-header-admin w-[100%] h-10 font-bold text-xl flex justify-center items-center text-white">
          EDIT PRODUCT
        </div>
        <div className="bg-white w-full h-[calc(100%-2.5rem)] overflow-hidden">
          <UpdateProductForm categories={categories} id={id} />
        </div>
      </div>
    </section>
  );
};

export default UpdateProductPage;
