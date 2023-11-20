"use client";
import Image from "next/image";
import { RootState } from "@/components/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@/components/redux/features/cartSlice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Product, Variant } from "@/types/products/products";
import classNames from "classnames";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/api/products";
import { Minus, Plus, X } from "lucide-react";

const CartItem = () => {
  const cart: Product[] = useSelector((state: RootState) => state.cart.item);
  const dispatch = useDispatch();

  const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]);
  const [quantities, setQuantities] = useState<number[]>(cart.map(() => 1));
  const [prices, setPrices] = useState<number[]>(cart.map(() => 0));
  const [total, setTotal] = useState<number>(0);
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => setProduct(res))
      .catch((e) => console.error(e));
  }, []);

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
      <section className="h-user-main-mobile mt-user-header-mobile pb-[calc(var(--h-user-navbar-mobile)*2)] px-5 pt-4 overflow-y-scroll md:h-user-main md:mt-user-header">
        <div className="flex flex-col gap-5">
          {product && product.length > 0 ? (
            product.map((product, productIndex) => (
              <div
                key={productIndex}
                className="relative bg-white flex shadow-lg rounded-md gap-3 h-fit p-3"
              >
                <div className="relative w-24 h-32">
                  <Image
                    src={`data:image/png;base64,${product.display_image}`}
                    alt={product.product_name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2>{product.display_name}</h2>
                  <div className="flex space-x-2 md:text-lg">
                    <p className="font-bold">
                      {selectedVariants[productIndex]?.variant_stocks ??
                        product.product_stocks}
                    </p>
                    <p>stocks</p>
                  </div>
                  <p className="text-custom-orange font-bold">
                    ₱ {""}
                    {selectedVariants[productIndex]?.variant_price ??
                      product.display_price}
                  </p>
                  <div className="flex gap-4">
                    {product.variants &&
                      product.variants.map((variant, variantIndex) => (
                        <Button
                          type="button"
                          size="sm"
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
                        </Button>
                      ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="xsm"
                      onClick={() => increaseQuantity(productIndex)}
                      className="rounded-none border"
                    >
                      <Plus width={12} height={12} />
                    </Button>
                    <p className="text-md font-semibold select-none">
                      {quantities[productIndex] ?? 0}
                    </p>
                    <Button
                      size="xsm"
                      variant="ghost"
                      onClick={() => decreaseQuantity(productIndex)}
                      className="rounded-none border"
                    >
                      <Minus width={12} height={12} />
                    </Button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(product, productIndex)}
                    className="bg-red-600 p-1 absolute top-0 right-0 rounded-tr-sm"
                  >
                    <X color="white" height={15} width={15} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>NO ITEMS IN THE CART</div>
          )}
        </div>

        <div className="bg-white w-full h-14 flex justify-between items-center fixed bottom-[var(--h-user-navbar-mobile)] left-0 p-4 shadow-md">
          <div className="flex items-center gap-3">
            <p className="font-bold text-lg ">Total:</p>
            <p className="text-custom-orange font-semibold text-lg">
              ₱{" "}
              {total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <Link
            href={{
              pathname: "/checkout",
              query: {
                order: JSON.stringify(orders),
              },
            }}
            className="w-fit h-fit"
          >
            <Button variant="buy">
              {selectedVariants.length > 0
                ? `Check Out (${selectedVariants.length})`
                : `Check Out (0)`}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};
export default CartItem;
