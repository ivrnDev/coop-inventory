import RenderProducts from "@/components/user/render/Products";
import { getAllProducts } from "@/lib/api/products";
import { Products } from "@/types/products/products";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Products = async ({ searchParams }: Params) => {
  const filterCategory = searchParams?.category as string;
  const search = (searchParams?.search as string) || "";
  const products: Products[] = await getAllProducts(
    filterCategory ?? null,
    true
  );
  return (
    <section className="h-user-main-mobile md:h-user-main pt-16 md:pt-9 md:w-[70%] md:mt-0">
      {products && products.length > 0 ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 h-[28rem] md:h-[29rem] w-full px-6 md:px-8 overflow-y-auto 
        "
        >
          <RenderProducts search={search} products={products} />
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
