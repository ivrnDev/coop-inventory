import RenderProducts from "@/components/user/render/Products";
import { getAllProducts } from "@/lib/api/products";
import { Products } from "@/types/products/products";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Products = async ({ searchParams }: Params) => {
  const filterCategory = searchParams?.category as string;
  const products: Products[] = await getAllProducts(filterCategory ?? null);
  return (
    <section className="h-user-main-mobile md:h-user-main pt-16 ">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 h-[28rem] w-full px-8 overflow-y-auto">
          <RenderProducts products={products} />
        </div>
      ) : (
        <div className="absolute top-48">
          <p className="font-bold text-xl">NO PRODUCTS AVAILABLE</p>
        </div>
      )}
    </section>
  );
};

export default Products;
