"use client";
import { useEffect, useState } from "react";

import { Product, Variant } from "@/types/products/products";
import { Button } from "@/components/ui/button";
import AddtoCartButton from "@/components/cart/AddtoCartBtn";
import classNames from "classnames";
import Link from "next/link";
import { Order } from "@/types/orders/orders";

type Props = {
  product: Product;
};

const Item = ({ product }: Props) => {
  const [count, setCount] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant>({
    ...product?.variants[0],
    variant_id: 1,
  });
  const [order, setOrder] = useState<Order[]>();

  useEffect(() => {
    setOrder([
      {
        product_id: String(selectedVariant?.product_id),
        variant_id: String(selectedVariant?.variant_id),
        quantity: String(count),
      },
    ]);
  }, [count, selectedVariant]);

  useEffect(() => {
    setCount(1);
  }, [selectedVariant]);

  return (
    <>
      {product && (
        <>
          <div
            id="info-container"
            className="bg-white drop-shadow-md px-2 pt-2 flex flex-col gap-1 h-72"
          >
            <h1 className="text-lg font-semibold">{product.display_name}</h1>
            <p className="text-custom-orange bg-[#F8EDED] font-bold text-lg w-full px-1">
              {`₱ ${selectedVariant?.variant_price ?? product.display_price}`}
            </p>
            <div className="flex space-x-2">
              <p className="font-bold">
                {`${selectedVariant?.variant_stocks ?? product.product_stocks}`}
              </p>
              <p>stocks</p>
            </div>

            <p className="text-md font-bold float-right">
              Total ₱ {selectedVariant?.variant_price * count}
            </p>
            <div className="flex gap-4 items-center flex-wrap">
              <p className="text-lg font-semibold">Variants</p>
              {product.variants?.map((item, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="variants"
                  onClick={() => setSelectedVariant(item)}
                  className={classNames({
                    "text-custom-orange border border-custom-orange":
                      selectedVariant?.variant_id === item.variant_id,
                  })}
                >
                  {item.variant_symbol}
                </Button>
              ))}
            </div>

            <div id="quantity-container" className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() =>
                  selectedVariant.variant_stocks >= count + 1 &&
                  setCount((prev) => prev + 1)
                }
              >
                <p>+</p>
              </Button>
              <p>{count}</p>
              <Button
                variant="secondary"
                onClick={() => count > 1 && setCount((prev) => prev - 1)}
              >
                <p>-</p>
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-sm p-2 mt-4 mx-3 h-64">
            <h1 className="text-xl font-bold">Product Description</h1>
            <p className="mt-2">{product.product_description}</p>
          </div>

          <div
            id="button-container"
            className="flex items-center w-full bg-red-500 fixed bottom-10 left-0"
          >
            <AddtoCartButton product={product} />
            <Link
              href={{
                pathname: `/checkout`,
                query: {
                  order: JSON.stringify(order),
                },
              }}
              className="w-full"
            >
              <Button variant="submit" className="flex-1">
                BUY NOW
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Item;
