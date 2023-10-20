import { getAllProducts } from "@/lib/api/products";
import { ProductsType } from "@/types/products/products";
import RenderProducts from "@/components/user/render/Products";

const Products = async () => {
  const products: ProductsType[] = await getAllProducts();
  return (
    
    <section className="bg-green-300 ml-[35%]">
      <RenderProducts products={products} />
    </section>

    

    

  );
};

export default Products;
