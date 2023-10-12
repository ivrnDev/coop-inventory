"use client";
import { ProductsType } from "@/types/products/products";
import Image from "next/image";
import { RootState } from "@/components/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@/components/redux/features/cartSlice";
import { useEffect, useState } from "react";
import { VariantTypes } from "@/variants";
import { getVariantByProductId } from "@/lib/api/variants";
const CartItem = () => {
  const cart: ProductsType[] = useSelector(
    (state: RootState) => state.cart.item
  );
  const dispatch = useDispatch();
  const [variants, setVariants] = useState<VariantTypes[][]>([]);
  const [selectedVariants, setSelectedVariants] = useState<VariantTypes[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  useEffect(() => {
    const fetchVariants = async () => {
      const variantArray = [];

      for (const item of cart) {
        try {
          const result = await getVariantByProductId(String(item.product_id));
          variantArray.push(result);
          setQuantities((quantities) => [...quantities, 1]);
        } catch (e) {
          console.error(e);
        }
      }

      setVariants(variantArray);
    };

    fetchVariants();
  }, [cart]);

  const handleVariantClick = (variant: VariantTypes) => {
    const hasVariant = selectedVariants.some((v) => v.id === variant.id);
    const hasProduct = selectedVariants.some(
      (v) => v.product_id === variant.product_id
    );

    if (!hasVariant) {
      setSelectedVariants([...selectedVariants, variant]);
    }
    if (hasProduct && !hasVariant) {
      const updatedVariants = selectedVariants.filter(
        (v) => v.product_id !== variant.product_id
      );
      setSelectedVariants([...updatedVariants, variant]);
    }
  };

  const increaseQuantity = (index: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const decreaseQuantity = (index: number) => {
    if (quantities[index] > 1) {
      const newQuantities = [...quantities];
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  return (
    <section className="flex flex-col gap-5">
      {cart && cart.length > 0 ? (
        cart.map((product, index) => (
          <div key={index} className="flex bg-white shadow-lg rounded-md h-fit">
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
                  variants[index].map((variant, index) => (
                    <button
                      key={index}
                      className={`p-2 ${
                        selectedVariants.some((v) => v.id === variant.id)
                          ? "bg-yellow-300"
                          : "bg-blue-300"
                      }`}
                      onClick={() => handleVariantClick(variant)}
                    >
                      {variant.variant_symbol}
                    </button>
                  ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => increaseQuantity(index)}
                  className="bg-green-500 p-2 font-medium text-[0.9rem]"
                >
                  +
                </button>
                <p>{quantities[index]}</p>
                <button
                  onClick={() => decreaseQuantity(index)}
                  className="bg-green-500 p-2 font-medium text-[0.9rem]"
                >
                  -
                </button>
              </div>

              <div>
                <button onClick={()=> dispatch(removeItem(product.product_id))}>REMOVE</button>
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