"use client";
import { useEffect, useState } from "react";

import { Product, Variant } from "@/types/products/products";
import { Button } from "@/components/ui/button";
import AddtoCartButton from "@/components/cart/AddtoCartBtn";
import classNames from "classnames";
import Link from "next/link";
import { Order } from "@/types/orders/orders";
import { Minus, Plus } from "lucide-react";

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
            className="max-md:bg-white max-md:drop-shadow-md px-2 pt-2 flex flex-col gap-2 h-72 md:w-full md:gap-1"
          >
            <h1 className="text-lg font-semibold md:text-2xl ">
              {product.display_name}
            </h1>
            <p className="text-custom-orange bg-[#F8EDED] font-bold text-lg w-full px-1 md:hidden">
              {`₱ ${selectedVariant?.variant_price ?? product.display_price}`}
            </p>
            <div className="flex space-x-2 md:text-lg">
              <p className="font-bold">
                {`${selectedVariant?.variant_stocks ?? product.product_stocks}`}
              </p>
              <p>stocks</p>
            </div>
            <p className="max-md:hidden text-custom-orange bg-[#F8EDED] font-bold text-2xl w-full px-1">
              {`₱ ${selectedVariant?.variant_price ?? product.display_price}`}
            </p>

            <div
              id="variants-container"
              className="flex gap-4 items-center flex-wrap mt-5 md:mt-3"
            >
              <p className="text-md font-semibold md:text-lg">Variants</p>
              {product.variants?.map((item, index) => (
                <Button
                  key={index}
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
            <div className="w-full max-md:h-full flex justify-between max-md:items-end max-md:mb-5 md:mt-2">
              <div>
                <p className="text-lg font-bold text-center md:text-2xl">Total Amount</p>
                <p className="text-lg font-semibold text-left md:text-2xl">
                  ₱ {selectedVariant?.variant_price * count}
                </p>
              </div>
              <div id="quantity-container" className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    selectedVariant.variant_stocks >= count + 1 &&
                    setCount((prev) => prev + 1)
                  }
                >
                  <Plus size={15} />
                </Button>
                <p className="text-lg font-semibold">{count}</p>
                <Button
                  variant="secondary"
                  onClick={() => count > 1 && setCount((prev) => prev - 1)}
                >
                  <Minus size={15} />
                </Button>
              </div>
            </div>
            <div
              id="button-container"
              className="max-md:hidden flex items-center w-full mt-1 gap-4"
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
                <Button variant="buy" className="w-full h-full">
                  BUY NOW
                </Button>
              </Link>
            </div>
          </div>

          <div
            id="button-container"
            className="flex items-center w-full fixed bottom-9 left-0 md:hidden"
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
              <Button variant="buy" className="w-full h-full">
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
