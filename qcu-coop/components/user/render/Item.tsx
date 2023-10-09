import Image from "next/image";
import { getProductById } from "@/lib/api/products";
import { ItemType } from "@/types/products/products";
import Link from "next/link";

type Props = {
  id: string;
  productVariant: string;
  qty: string;
  children: React.ReactNode;
};

const Item = async ({ id, productVariant, qty, children }: Props) => {
  const product: ItemType[] = await getProductById(id);

  const order = {
    product_id: id,
    variant_id: productVariant,
    quantity: qty,
  };

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
                      <p key={index} className="text-[1.5rem] font-bold">
                        {variant.variant_price}
                      </p>
                    )
                )}
              </div>
              {children} {/*Quantity Button*/}
              <div className="flex gap-10">
                {product.map((item, index) => (
                  <Link
                    href={`?${new URLSearchParams({
                      id,
                      variantId: `${item.variant_id}`,
                      variant: `${item.variant_name}`,
                    }).toString()}`}
                    key={index}
                    className={`p-1 capitalize w-8 flex justify-center items-center ${
                      productVariant === String(item.variant_id)
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {item.variant_symbol}
                  </Link>
                ))}
              </div>
              <div>
                <button className="bg-yellow-500 p-3 rounded-xl">
                  Add to Cart
                </button>
                {order &&
                order.product_id &&
                order.variant_id &&
                order.quantity ? (
                  <Link
                    href={{
                      pathname: `./buy`,
                      query: {
                        products: JSON.stringify(order),
                      },
                    }}
                    className="bg-green-500 p-3 rounded-xl"
                  >
                    Buy Now
                  </Link>
                ) : (
                  <Link
                    href=""
                    className="bg-green-500 p-3 rounded-xl opacity-50 cursor-not-allowed"
                  >
                    Buy Now
                  </Link>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Item;
