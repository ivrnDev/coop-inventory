import { getAllProducts } from "@/lib/api/products";
import RenderProducts from "@/components/user/render/Products";
import { Products } from "@/types/products/products";

const Products = async () => {
  const products: Products[] = await getAllProducts();
  return (
    <section className="ml-[35%] px-3 grid grid-cols-1 gap-4 place-items-center md:grid-cols-4">
      <RenderProducts products={products} />
    </section>
  );
};

export default Products;
