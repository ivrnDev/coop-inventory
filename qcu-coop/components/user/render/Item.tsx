import Image from "next/image";
import { getProductById } from "@/lib/api/products";
import { ItemType } from "@/types/products/products";
import Link from "next/link";

type Props = {
  productId: string;
};

const Item: React.FC<Props> = async ({ productId }) => {
  const product: ItemType[] = await getProductById(productId);
  return (
    <>
      {productId && (
        <>
          <section className="flex">
            <div className="relative h-[450px] w-[500px] rounded-md object-cover">
              <Image
                src={`data:image/png;base64,${product[0].display_image}`}
                alt={product[0].product_name}
                fill
              />
            </div>
          </section>
          <section>
            <div>
              <h1>{product[0].display_name}</h1>
              <p>{product[0].product_description}</p>
              <div className="flex gap-2">
                {product.map((product, index) => (
                  <Link
                    href={`/`}
                    key={index}
                    className="bg-blue-500 p-1 capitalize w-8 flex justify-center items-center"
                  >
                    {product.variant_symbol}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Item;
