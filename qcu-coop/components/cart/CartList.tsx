"use client";
import Image from "next/image";
import { RootState } from "@/components/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@/components/redux/features/cartSlice";
import { useEffect, useState } from "react";
import { getVariantByProductId } from "@/lib/api/variants";
import Link from "next/link";
import { Product, Variant } from "@/types/products/products";
import classNames from "classnames";

const CartItem = () => {
  const cart: Product[] = useSelector((state: RootState) => state.cart.item);
  const dispatch = useDispatch();

  // const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]);
  const [quantities, setQuantities] = useState<number[]>(cart.map(() => 1));
  const [previousPrice, setPreviousPrice] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);

  // useEffect(() => {
  //   const fetchVariants = async () => {
  //     const variantArray = [];

  //     const newQuantities = [];
  //     for (const item of cart) {
  //       try {
  //         const result = await getVariantByProductId(String(item.product_id));
  //         variantArray.push(result);
  //         if (quantities.length > 0) {
  //           setQuantities([...quantities]);
  //         } else {
  //           newQuantities.push(1);
  //           setQuantities(newQuantities);
  //         }
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     }

  //     setVariants(variantArray);
  //   };

  //   fetchVariants();
  // }, [cart]);

  const handleVariantClick = (variant: Variant, productIndex: number) => {
    // const hasVariant =
    //   selectedVariants[productIndex]?.variant_id === variant.variant_id;
    // const hasProduct = selectedVariants.some(
    //   (v) => v.product_id === variant.product_id
    // );
    // if (!hasVariant && !hasProduct) {
    //   setSelectedVariants((prev) => [...prev, variant]);
    //   const currentPrice = Number(variant.variant_price) * quantities[productIndex];
    //   setTotal(total + currentPrice);
    //   previousPrice[productIndex] = currentPrice;
    // }
    // if (hasProduct && !hasVariant) {
    //   setSelectedVariants((prev) => {
    //     const newSelectedVariants = [...prev];
    //     newSelectedVariants.splice(productIndex, 1, variant);
    //     return newSelectedVariants;
    //   });
    // const currentPrice =
    //   Number(variant.variant_price) * quantities[productIndex];
    // const subtractPrevPrice = total - previousPrice[productIndex];
    // if (previousPrice[productIndex] > 0) {
    //   setTotal(subtractPrevPrice + currentPrice);
    //   previousPrice[productIndex] = currentPrice;
    // }
    // }
  };
  const increaseQuantity = (productIndex: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[productIndex] += 1;
      return newQuantities;
    });

    // if (selectedVariants[productIndex]) {
    //   const currentPrice = Number(selectedVariants[productIndex].variant_price);
    //   setTotal(total + currentPrice);
    //   previousPrice[productIndex] = currentPrice * newQuantities[productIndex];
    // }
  };
  const decreaseQuantity = (productIndex: number) => {
    if (quantities[productIndex] > 1) {
      setQuantities((prev) => {
        const newQuantities = [...prev];
        newQuantities[productIndex] -= 1;
        return newQuantities;
      });
    }

    // if (quantities[productIndex] > 1) {
    //   const newQuantities = [...quantities];
    //   newQuantities[productIndex] -= 1;
    //   setQuantities(newQuantities);
    //   const currentPrice = Number(selectedVariants[productIndex].variant_price);
    //   if (total > 0 && selectedVariants[productIndex]) {
    //     setTotal(total - currentPrice);
    //     previousPrice[productIndex] =
    //       currentPrice * newQuantities[productIndex];
    //   }
    // }
  };

  const handleRemoveItem = (product: Product, productIndex: number) => {
    dispatch(removeItem(product.product_id));

    setSelectedVariants((prev) => {
      const newSelectedVariants = [...prev];
      newSelectedVariants.splice(productIndex, 1);
      return newSelectedVariants;
    });
    setQuantities((prev) => {
      const newSelectedVariants = [...prev];
      newSelectedVariants.splice(productIndex, 1);
      return newSelectedVariants;
    });

    // if (selectedVariants[productIndex]) {
    //   setTotal(
    //     total -
    //       Number(selectedVariants[productIndex].variant_price) *
    //         quantities[productIndex]
    //   );
    // setSelectedVariants((prevVariants) => {
    //   return prevVariants.filter((v) => v.product_id !== product.product_id);
    // });
    // setQuantities((prevVariants) => {
    //   return prevVariants.filter((v, index) => index !== productIndex);
    // });
    // setPreviousPrice((prevVariants) => {
    //   return prevVariants.filter((v, index) => index !== productIndex);
    // });
    // }
  };
  // const orderArray = selectedVariants.map((variant, orderIndex) => ({
  //   product_id: variant.product_id,
  //   variant_id: variant.variant_id,
  //   quantity: quantities[orderIndex],
  // }));

  return (
    <>
      <section className="flex flex-col gap-5">
        {cart && cart.length > 0 ? (
          cart.map((product, productIndex) => (
            <div
              key={productIndex}
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
                  {product.variants &&
                    product.variants.map((variant, variantIndex) => (
                      <button
                        key={variantIndex}
                        className={classNames({
                          "bg-blue-300": true,
                          "bg-yellow-300": selectedVariants.some(
                            (v) =>
                              v.variant_id === variant.variant_id &&
                              v.product_id === variant.product_id
                          ),
                        })}
                        onClick={() =>
                          handleVariantClick(variant, productIndex)
                        }
                      >
                        {variant.variant_symbol}
                      </button>
                    ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => increaseQuantity(productIndex)}
                    className="bg-green-500 p-2 font-medium text-[0.9rem]"
                  >
                    +
                  </button>
                  <p>{quantities[productIndex] ?? 0}</p>
                  <button
                    onClick={() => decreaseQuantity(productIndex)}
                    className="bg-green-500 p-2 font-medium text-[0.9rem]"
                  >
                    -
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => handleRemoveItem(product, productIndex)}
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
            pathname: "./checkout",
            query: {
              // products: JSON.stringify(orderArray),
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
