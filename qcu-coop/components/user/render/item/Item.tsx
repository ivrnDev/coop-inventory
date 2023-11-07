import Image from "next/image";
import { getProductById } from "@/lib/api/products";

import { Product } from "@/types/products/products";
import ChoicesComponent from "./Choices";

type Props = {
  searchParams: {
    product_id: string;
    variant_id: string;
    quantity: string;
    amount: string;
  };
};

const Item = async ({ searchParams }: Props) => {
  const { product_id, variant_id, quantity, amount } = searchParams;
  const product: Product[] = await getProductById(product_id);
  const findVariant = product[0].variants.filter(
    (v) => v.variant_id === Number(variant_id)
  );

  const order = [
    {
      product_id: String(product[0].product_id),
      variant_id,
      quantity,
      amount,
    },
  ];

  return (
    <>
      {product && (
        <>
          <section className="flex flex-col min-h-user-main-mobile">
            <div className="relative h-[35vh] w-56 object-contain border border-black">
              <Image
                src={`data:image/png;base64,${product[0].display_image}`}
                alt={product[0].product_name}
                sizes="min-h-1"
                fill
              />
            </div>
            <div className="">
              <h1 className="">{product[0].display_name}</h1>

              <p className="">
                {variant_id
                  ? findVariant[0].variant_price
                  : product[0].display_price}
              </p>

              <p className="">{product[0].product_sold} sold</p>
              <p className="">
                Stocks:
                {variant_id
                  ? findVariant[0].variant_stocks
                  : product[0].product_stocks}
              </p>
              <p>Total Amount: {amount}</p>
              <p>Variants</p>
              <div className="flex gap-10">
                <ChoicesComponent product={product} orders={order} />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Item;
