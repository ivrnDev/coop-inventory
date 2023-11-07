import Item from "@/components/user/render/item/Item";
import { getProductById } from "@/lib/api/products";
import Image from "next/image";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ItemPage = async ({ searchParams }: Params) => {
  const product_id = searchParams?.id as string;
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
