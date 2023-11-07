"use client";
import Image from "next/image";
import { RootState } from "@/components/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@/components/redux/features/cartSlice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Product, Variant } from "@/types/products/products";
import classNames from "classnames";

const CartItem = () => {
  const cart: Product[] = useSelector((state: RootState) => state.cart.item);
  const dispatch = useDispatch();

  const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]);
  const [quantities, setQuantities] = useState<number[]>(cart.map(() => 1));
  const [previousPrice, setPreviousPrice] = useState<number[]>(
    cart.map(() => 0)
  );
  const [total, setTotal] = useState<number>(0);

  const handleVariantClick = (variant: Variant, productIndex: number) => {
    if (variant) {
      const currentPrice =
        Number(variant.variant_price) * quantities[productIndex];
      const hasVariant = selectedVariants.some((v) => variant === v);
      const hasProduct = selectedVariants.some(
        (v) => v.product_id === variant.product_id
      );

      if (!hasVariant && !hasProduct) {
        setSelectedVariants((prev) => [...prev, variant]);
        setTotal((prev) => prev + currentPrice);
        setPreviousPrice((prev) => {
          const prevPrice = [...prev];
          prevPrice[productIndex] = currentPrice;
          return prevPrice;
        });
      }

      if (hasProduct && !hasVariant) {
        setSelectedVariants((prev) => {
          const newSelectedVariants = [...prev];
          newSelectedVariants.splice(productIndex, 1, variant);
          return newSelectedVariants;
        });
        setTotal((currentTotal) => {
          const subtractedTotal =
            currentTotal - previousPrice[productIndex] ?? 0;
          return subtractedTotal + currentPrice;
        });
        setPreviousPrice((prev) => {
          const prevPrice = [...prev];
          prevPrice[productIndex] = currentPrice;
          return prevPrice;
        });
      }
    }
  };
  const increaseQuantity = (productIndex: number) => {
    const newQuantities = [...quantities];
    newQuantities[productIndex] += 1;
    setQuantities(newQuantities);

    if (selectedVariants[productIndex]) {
      const currentPrice = Number(selectedVariants[productIndex].variant_price);

      setTotal((prev) => prev + currentPrice);

      setPreviousPrice((prev) => {
        const prevPrice = [...prev];
        prevPrice[productIndex] = currentPrice * newQuantities[productIndex];
        return prevPrice;
      });
    }
  };

  const decreaseQuantity = (productIndex: number) => {
    if (quantities[productIndex] <= 1) return;

    const newQuantities = [...quantities];
    newQuantities[productIndex] -= 1;
    setQuantities(newQuantities);

    if (total > 0 && selectedVariants[productIndex]) {
      const currentPrice = Number(selectedVariants[productIndex].variant_price);
      setTotal((prev) => prev - currentPrice);
      setPreviousPrice((prev) => {
        const prevPrice = [...prev];
        prevPrice[productIndex] = currentPrice * newQuantities[productIndex];
        return prevPrice;
      });
    }
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

    setPreviousPrice((prev) => {
      const prevPrice = [...prev];
      prevPrice.splice(productIndex, 1);
      return prevPrice;
    });

    if (selectedVariants[productIndex]) {
      setTotal((prev) => {
        const currentPrice =
          Number(selectedVariants[productIndex].variant_price) *
          quantities[productIndex];
        return prev - currentPrice;
      });
    }
  };

  const orders = selectedVariants.map((variant, orderIndex) => ({
    product_id: variant.product_id,
    variant_id: variant.variant_id,
    quantity: quantities[orderIndex],
  }));

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
                          "bg-blue-300 p-3": true,
                          "bg-yellow-300": selectedVariants.some(
                            (v) => variant === v
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
            pathname: "/checkout",
            query: {
              order: JSON.stringify(orders),
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
