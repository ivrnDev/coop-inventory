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

  return products.map((p) => ({ productId: p.product_id }));
}

const UpdateProductPage = async ({ params }: Params) => {
  const id = params?.productId as string;
  const product: Product[] = await getProductById(id);
  const categories: Categories[] = await getAllCategories();

  return (
    <section className="relative w-full h-[500px] rounded-md flex items-center border border-solid border-black overflow-hidden">
      <div className="absolute bg-header-admin w-[100%] h-10 top-0 left-0 justify-center text-white text-[1.2rem] rounded-t-md flex items-center font-bold">
        EDIT PRODUCT
      </div>
      <div className="bg-white w-full h-[calc(100%-2.5rem)] mt-10 oveflow-hidden py-8 px-9">
        <Suspense fallback={<p>Loading...</p>}>
          <UpdateProductForm categories={categories} product={product[0]} />
        </Suspense>
      </div>
    </section>
  );
};

export default UpdateProductPage;
