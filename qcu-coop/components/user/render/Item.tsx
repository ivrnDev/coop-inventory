import Image from "next/image";
import { getProductById } from "@/lib/api/products";
import { ItemType } from "@/types/products/products";
import Link from "next/link";

type Props = {
  id: string;
  productVariant: string;
};

const Item = async ({ id, productVariant }: Props) => {
  const product: ItemType[] = await getProductById(id);
  return (
    <>
      {product && (
        <>
          <section className="flex">
            <div className="relative h-[400px] w-[500px] rounded-md object-contain">
              <Image
                src={`data:image/png;base64,${product[0].display_image}`}
                alt={product[0].product_name}
                fill
              />
            </div>
          </section>
          <section className="bg-red-400 w-screen flex justify-center">
            <div className="flex flex-col h-fit text-center gap-20">
              <div>
                <h1 className=" font-bold text-[1.5rem] text-white">
                  {product[0].display_name}
                </h1>
                <p className="text-[1.2rem] opacity-75 ">
                  {product[0].product_description}
                </p>

                {product.map(
                  (variant, index) =>
                    variant.variant_name === productVariant && (
                      <p key={index} className="text-[1.5rem] font-bold">{variant.variant_price}</p>
                    )
                )}
              </div>

              <div className="flex gap-10">
                {product.map((item, index) => (
                  <Link
                    href={`?${new URLSearchParams({
                      id,
                      variant: `${item.variant_name}`,
                    })}`}
                    key={index}
                    className="bg-blue-500 p-1 capitalize w-8 flex justify-center items-center "
                  >
                    {item.variant_symbol}
                  </Link>
                ))}
              </div>

              <div>
                <button className="bg-yellow-500 p-3 rounded-xl">
                  Add to Cart
                </button>
                <button className="bg-green-500 p-3 rounded-xl">Buy Now</button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Item;
