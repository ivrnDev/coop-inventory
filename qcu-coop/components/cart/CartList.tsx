"use client";
import { ProductsType } from "@/types/products/products";
import Image from "next/image";
import { RootState } from "@/components/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@/components/redux/features/cartSlice";
import { useEffect, useState } from "react";
import { VariantTypes } from "@/variants";
import { getVariantByProductId } from "@/lib/api/variants";
import Link from "next/link";
import { Order } from "@/types/orders/orders";

const CartItem = () => {
  const cart: ProductsType[] = useSelector(
    (state: RootState) => state.cart.item
  );
  const dispatch = useDispatch();
  const [variants, setVariants] = useState<VariantTypes[][]>([]);
  const [selectedVariants, setSelectedVariants] = useState<VariantTypes[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchVariants = async () => {
      const variantArray = [];

     const newQuantities = [];
     for (const item of cart) {
       try {
         const result = await getVariantByProductId(String(item.product_id));
         variantArray.push(result);
         newQuantities.push(1);
       } catch (e) {
         console.error(e);
       }
     }

     setQuantities(newQuantities);
      setVariants(variantArray);
    };

    fetchVariants();
  }, [cart]);

  const handleVariantClick = (variant: VariantTypes, index: number) => {
    const hasVariant = selectedVariants.some((v) => v.id === variant.id);
    const hasProduct = selectedVariants.some(
      (v) => v.product_id === variant.product_id
    );
    if (!hasVariant) {
      setSelectedVariants([...selectedVariants, variant]);
      // setTotal(total + (Number(variant.variant_price) * quantities[index]));
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

  const orderArray = selectedVariants.map((variant, index) => ({
    product_id: variant.product_id,
    variant_id: variant.variant_id,
    quantity: quantities[index],
  }));

  return (
    <>
      <section className="flex flex-col gap-5">
        {cart && cart.length > 0 ? (
          cart.map((product, index) => (
            <div
              key={index}
              className="flex bg-white shadow-lg rounded-md h-fit"
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
                    variants[index].map((variant, vIndex) => (
                      <button
                        key={vIndex}
                        className={`p-2 ${
                          selectedVariants.some((v) => v.id === variant.id)
                            ? "bg-yellow-300"
                            : "bg-blue-300"
                        }`}
                        onClick={() => handleVariantClick(variant, vIndex)}
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
                  <button
                    onClick={() => dispatch(removeItem(product.product_id))}
                    className="bg-red-400 p-2"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>NO ITEMS IN THE CART</div>
        )}
      </section>
      <section className="bg-red-400 flex flex-col h-[80%] w-60 absolute top-0 right-0 mt-[124px] p-7">
        <p className="font-bold text-white text-[1.8rem]">TOTAL: {total}</p>

        <Link
          href={{
            pathname: "./buy",
            query: {
              products: JSON.stringify(orderArray),
            },
          }}
          className="bg-green-600 p-4 rounded-md w-fit whitespace-nowrap text-white font-bold text-center absolute bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          PLACE ORDER
        </Link>
      </section>
    </>
  );
};
export default CartItem;
