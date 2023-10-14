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

const CartItem = () => {
  const cart: ProductsType[] = useSelector(
    (state: RootState) => state.cart.item
  );
  const dispatch = useDispatch();
  const [variants, setVariants] = useState<VariantTypes[][]>([]);
  const [selectedVariants, setSelectedVariants] = useState<VariantTypes[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [previousPrice, setPreviousPrice] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchVariants = async () => {
      const variantArray = [];

      const newQuantities = [];
      for (const item of cart) {
        try {
          const result = await getVariantByProductId(String(item.product_id));
          variantArray.push(result);
          if (quantities.length > 0) {
            setQuantities([...quantities]);
          } else {
            newQuantities.push(1);
            setQuantities(newQuantities);
          }
        } catch (e) {
          console.error(e);
        }
      }

      setVariants(variantArray);
    };

    fetchVariants();
  }, [cart]);

  const handleVariantClick = (variant: VariantTypes, productIndex: number) => {
    const hasVariant = selectedVariants.some((v) => v.id === variant.id);
    const hasProduct = selectedVariants.some(
      (v) => v.product_id === variant.product_id
    );
    if (!hasVariant && !hasProduct) {
      setSelectedVariants([...selectedVariants, variant]);
      const currentPrice =
        Number(variant.variant_price) * quantities[productIndex];
      setTotal(total + currentPrice);
      previousPrice[productIndex] = currentPrice;
    }
    if (hasProduct && !hasVariant) {
      // const updatedVariants = selectedVariants.filter(
      //   (v) => v.product_id !== variant.product_id
      // );
      // setSelectedVariants([...updatedVariants, variant]);
      const newSelectedVariants = [...selectedVariants];
      newSelectedVariants[productIndex] = variant;
      setSelectedVariants(newSelectedVariants);

      const currentPrice =
        Number(variant.variant_price) * quantities[productIndex];
      const subtractPrevPrice = total - previousPrice[productIndex];

      if (previousPrice[productIndex] > 0) {
        setTotal(subtractPrevPrice + currentPrice);
        previousPrice[productIndex] = currentPrice;
      }
    }
  };
  const increaseQuantity = (productIndex: number) => {
    const newQuantities = [...quantities];
    newQuantities[productIndex] += 1;
    setQuantities(newQuantities);
    if (selectedVariants[productIndex]) {
      const currentPrice = Number(selectedVariants[productIndex].variant_price);
      setTotal(total + currentPrice);
      previousPrice[productIndex] = currentPrice * newQuantities[productIndex];
      console.log(selectedVariants);
      console.log(quantities);
    }
  };
  const decreaseQuantity = (productIndex: number) => {
    if (quantities[productIndex] > 1) {
      const newQuantities = [...quantities];
      newQuantities[productIndex] -= 1;
      setQuantities(newQuantities);
      const currentPrice = Number(selectedVariants[productIndex].variant_price);
      if (total > 0 && selectedVariants[productIndex]) {
        setTotal(total - currentPrice);
        previousPrice[productIndex] =
          currentPrice * newQuantities[productIndex];
        console.log(selectedVariants);
        console.log(quantities);
      }
    }
  };

  const handleRemoveItem = (product: ProductsType, productIndex: number) => {
    dispatch(removeItem(product.product_id));
    if (selectedVariants[productIndex]) {
      setTotal(
        total -
          Number(selectedVariants[productIndex].variant_price) *
            quantities[productIndex]
      );
      setSelectedVariants((prevVariants) => {
        return prevVariants.filter((v) => v.product_id !== product.product_id);
      });
      setQuantities((prevVariants) => {
        return prevVariants.filter((v, index) => index !== productIndex);
      });
      setPreviousPrice((prevVariants) => {
        return prevVariants.filter((v, index) => index !== productIndex);
      });
    }
  };
  const orderArray = selectedVariants.map((variant, orderIndex) => ({
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
                  {variants[productIndex] &&
                    variants[productIndex].map((variant, variantIndex) => (
                      <button
                        key={variantIndex}
                        className={`p-2 ${
                          selectedVariants.some((v) => v.id === variant.id)
                            ? "bg-yellow-300"
                            : "bg-blue-300"
                        }`}
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
                  <p>{quantities[productIndex]}</p>
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
