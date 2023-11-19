import Item from "@/components/user/render/item/Item";
import { getAllProducts, getProductById } from "@/lib/api/products";
import { Products } from "@/types/products/products";
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
    <section>
      <div className="relative h-[35vh] w-56 object-contain border border-black">
        <Image
          src={`data:image/png;base64,${product[0]?.display_image}`}
          alt={product[0]?.product_name}
          sizes="min-h-1"
          fill
        />
      </div>
      <Item product={product[0]} />
    </section>
  );
};

export default ItemPage;
