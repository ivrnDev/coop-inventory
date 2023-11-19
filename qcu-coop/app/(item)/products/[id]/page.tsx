import Albums from "@/components/user/carousel/Albums";
import Item from "@/components/user/render/item/Item";
import { getAllProducts, getProductById } from "@/lib/api/products";
import { Product, Products } from "@/types/products/products";
import Image from "next/image";

type Params = {
  params: { id: number };
};

export async function generateStaticParams() {
  const products: Products[] = await getAllProducts();

  return products.map((p) => ({ id: String(p.product_id) }));
}

const ItemPage = async ({ params }: Params) => {
  const product_id = String(params?.id);
  const product = await getProductById(product_id);

  return (
    <section className="relative h-user-main-mobile mt-user pb-10 overflow-y-auto mb-15 md:h-user-main md:w-[60%] md:mt-0">
      <Albums albums={product[0]?.albums} image={product[0]?.display_image} />
      <Item product={product[0]} />
    </section>
  );
};
export default ItemPage;
