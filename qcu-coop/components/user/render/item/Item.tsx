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
          <div className="flex flex-col min-h-user-main-mobile">
            <div className="">
              <h1 className="">{product.display_name}</h1>
              <p className="">
                {selectedVariant?.variant_price ?? product.display_price}
              </p>
              <p className="">
                Stocks:{" "}
                {selectedVariant?.variant_stocks ?? product.product_stocks}
              </p>
              <p>Total Amount: {selectedVariant?.variant_price * count}</p>
              <p>Variants</p>
            </div>
            <div className="flex">
              {product.variants?.map((item, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="system"
                  onClick={() => setSelectedVariant(item)}
                  className={classNames({
                    "bg-blue-500": true,
                    "bg-yellow-500":
                      selectedVariant?.variant_id === item.variant_id,
                  })}
                >
                  {item.variant_symbol}
                </Button>
              ))}
            </div>
            <div id="quantity-container" className="flex">
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

            <div id="button-container" className="flex">
              <AddtoCartButton product={product} />
              <Link
                href={{
                  pathname: `/checkout`,
                  query: {
                    order: JSON.stringify(order),
                  },
                }}
              >
                <Button variant="submit">BUY NOW</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Item;
