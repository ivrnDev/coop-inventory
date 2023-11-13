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
  const [prices, setPrices] = useState<number[]>(cart.map(() => 0));
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const priceTotal = prices.reduce(
      (accumulator, value) => accumulator + value,
      0
    );
    setTotal(priceTotal);
  }, [prices]);

  const handleVariantClick = (variant: Variant, productIndex: number) => {
    if (variant) {
      const existingIndex = selectedVariants.findIndex(
        (v) => v?.product_id === variant?.product_id
      );

      const newSelectedVariants = [...selectedVariants];
      const newQuantities = [...quantities];
      const newPrices = [...prices];

      if (existingIndex !== -1) {
        newSelectedVariants[existingIndex] = variant;
        newQuantities[existingIndex] = 1;
        newPrices[existingIndex] = Number(variant.variant_price);
      } else {
        newSelectedVariants[productIndex] = variant;
        newQuantities[productIndex] = 1;
        newPrices[productIndex] = Number(variant.variant_price);
      }

      setSelectedVariants(newSelectedVariants);
      setQuantities(newQuantities);
      setPrices(newPrices);
    }
  };

  const increaseQuantity = (productIndex: number) => {
    const newQuantities = [...quantities];
    if (
      selectedVariants[productIndex]?.variant_stocks >=
      quantities[productIndex] + 1
    ) {
      newQuantities[productIndex] += 1;
      setQuantities(newQuantities);

      if (selectedVariants[productIndex]) {
        const currentPrice = Number(
          selectedVariants[productIndex].variant_price
        );

        const newPrices = [...prices];
        newPrices[productIndex] += currentPrice;
        setPrices(newPrices);
      }
    }
  };

  const decreaseQuantity = (productIndex: number) => {
    console.log({ selectedVariants, quantities, prices });
    if (quantities[productIndex] <= 1) return;

    const newQuantities = [...quantities];
    newQuantities[productIndex] -= 1;
    setQuantities(newQuantities);

    if (total > 0 && selectedVariants[productIndex]) {
      const currentPrice = Number(selectedVariants[productIndex].variant_price);

      const newPrices = [...prices];
      newPrices[productIndex] -= currentPrice;
      setPrices(newPrices);
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

    if (selectedVariants[productIndex]) {
      const currentPrice = Number(selectedVariants[productIndex].variant_price);
      const newPrices = [...prices];
      newPrices[productIndex] =
        newPrices[productIndex] - currentPrice * quantities[productIndex];
      setPrices(newPrices);
    }
  };

  const orders = selectedVariants.map((variant, orderIndex) => ({
    product_id: variant?.product_id,
    variant_id: variant?.variant_id,
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
                <p>
                  {selectedVariants[productIndex]?.variant_stocks ??
                    product.product_stocks}
                </p>
                <p>
                  {selectedVariants[productIndex]?.variant_price ??
                    product.display_price}
                </p>
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
        <p className="font-bold text-white text-[1.8rem]">TOTAL: {total} </p>

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
