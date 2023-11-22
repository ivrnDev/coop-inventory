"use client";
import Image from "next/image";
import { RootState } from "@/components/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@/components/redux/features/cartSlice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Product, Variant } from "@/types/products/products";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CartItem = () => {
  const cart: Product[] = useSelector((state: RootState) => state.cart.item);
  const dispatch = useDispatch();

  const [selectedVariants, setSelectedVariants] = useState<Variant[]>(
    cart.map((v) => v.variants[0])
  );
  const [quantities, setQuantities] = useState<number[]>(cart.map(() => 1));
  const [prices, setPrices] = useState<number[]>(
    cart.map((v) => Number(v.variants[0].variant_price))
  );
  const [total, setTotal] = useState<number>(
    cart.reduce((acc, v) => acc + Number(v.variants[0].variant_price), 0)
  );

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
      const newQuantities = [...prev];
      newQuantities.splice(productIndex, 1);
      return newQuantities;
    });
    setPrices((prev) => {
      const newPrices = [...prev];
      newPrices.splice(productIndex, 1);
      return newPrices;
    });
  };

  const orders = selectedVariants.map((variant, orderIndex) => ({
    product_id: variant?.product_id,
    variant_id: variant?.variant_id,
    quantity: quantities[orderIndex],
  }));

  return (
    <>
      <section className="h-user-main-mobile mt-user-header-mobile max-md:pb-[calc(var(--h-user-navbar-mobile)*2)] px-5 pt-4 overflow-y-auto md:h-user-main md:mt-user-header">
        <div id="info-container" className="flex flex-col gap-5 md:gap-14 md:p-8">
          {cart && cart.length > 0 ? (
            cart.map((product, productIndex) => (
              <div
                key={productIndex}
                className="relative bg-white flex items-center shadow-lg rounded-md gap-3 h-fit p-3 md:h-64"
              >
                <div className="relative max-md:w-32 max-md:h-32 md:border md:w-56 md:h-full">
                  <Image
                    src={`data:image/png;base64,${product.display_image}`}
                    alt={product.product_name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full h-full md:self-start">
                  <h2 className="md:text-2xl">
                    {product.display_name}
                  </h2>
                  <div className="flex space-x-2 md:text-lg">
                    <p className="font-bold">
                      {selectedVariants[productIndex]?.variant_stocks ??
                        product.product_stocks}
                    </p>
                    <p>stocks</p>
                  </div>
                  <p className="text-custom-orange font-bold md:text-2xl">
                    ₱ {""}
                    {prices[productIndex].toLocaleString(
                    "en-US",
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                  ) ??
                      product.display_price}
                  </p>

                  <Select
                    onValueChange={(newValue) => {
                      const parseValue = JSON.parse(newValue);
                      handleVariantClick(parseValue.variant, parseValue.index);
                    }}
                  >
                    <SelectTrigger id="variant" className="w-full md:w-[35%]">
                      <SelectValue
                        placeholder={
                          selectedVariants[productIndex].variant_name
                        }
                      />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        {product.variants.map((variant, index) => (
                          <SelectItem
                            key={index}
                            value={JSON.stringify({ variant, index })}
                          >
                            <p className="capitalize">{variant.variant_name}</p>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <div
                    id="quantity-container"
                    className="flex items-center gap-3"
                  >
                    <Button
                      variant="ghost"
                      size="xsm"
                      onClick={() => increaseQuantity(productIndex)}
                      className="rounded-none border md:h-fit"
                    >
                      <Plus width={12} height={12} className="md:h-7 md:w-7" />
                    </Button>
                    <p className="text-md font-semibold select-none md:text-xl">
                      {quantities[productIndex] ?? 0}
                    </p>
                    <Button
                      size="xsm"
                      variant="ghost"
                      onClick={() => decreaseQuantity(productIndex)}
                      className="rounded-none border md:h-fit"
                    >
                      <Minus width={12} height={12} className="md:h-7 md:w-7" />
                    </Button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(product, productIndex)}
                    className="bg-red-600 p-1 absolute top-0 right-0 rounded-tr-sm"
                  >
                    <X color="white" height={15} width={15} className="md:w-6 md:h-6" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="font-bold text-xl absolute top-[45%] left-1/2 translate-x-[-50%] translate-y-[-50%] md:text-3xl">
              No Items in the Cart
            </div>
          )}
        </div>

        <div className="bg-white shadow-md flex justify-between items-center right-0 p-4 fixed max-md:bottom-[var(--h-user-navbar-mobile)] max-md:w-full h-14 md:bottom-0 md:w-2/4 md:h-20">
          <div className="flex items-center gap-3 md:gap-7">
            <p className="font-bold text-lg md:text-3xl ">Total:</p>
            <p className="text-custom-orange font-semibold text-lg md:text-3xl md:font-bold">
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
