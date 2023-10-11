"use client";
import { ProductsType } from "@/types/products/products";
import Image from "next/image";
import { RootState } from "@/components/redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { VariantTypes } from "@/variants";
import { getVariantByProductId } from "@/lib/api/variants";
const CartItem = () => {
  const cart: ProductsType[] = useSelector(
    (state: RootState) => state.cart.item
  );
  const [variants, setVariants] = useState<VariantTypes[][]>([]);
  useEffect(() => {
    const fetchVariants = async () => {
      const variantArray = [];

      for (const item of cart) {
        try {
          const result = await getVariantByProductId(String(item.product_id));
          variantArray.push(result);
        } catch (e) {
          console.error(e);
        }
      }

      setVariants(variantArray);
    };

    fetchVariants();
  }, [cart]);
  return (
    <section className="flex flex-col gap-5">
      {cart && cart.length > 0 ? (
        cart.map((product, index) => (
          <div
            key={index}
            className="flex bg-white shadow-lg rounded-md h-fit "
          >
            <div className="relative w-20 h-20 object-contain">
              <Image
                src={`data:image/png;base64,${product.display_image}`}
                alt={product.product_name}
                fill
              />
            </div>
            <div>
              <h2>{product.display_name}</h2>
              <p>{product.display_price}</p>
              <div className="flex gap-4">
                {variants[index] &&
                  variants[index].map((variant) => (
                    <button className="bg-yellow-500 p-2 ">
                      {variant.variant_symbol}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>NO ITEMS ADDED IN THE CART</div>
      )}
    </section>
  );
};
export default CartItem;
