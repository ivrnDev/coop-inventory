"use client";
import AddtoCartButton from "@/components/cart/AddtoCartBtn";
import { Button } from "@/components/ui/button";
import { ValidateOrder } from "@/middleware/zod/orders";
import { Product, Variant } from "@/types/products/products";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  product: Product[];
  orders: ValidateOrder[];
};

const ChoicesComponent = ({ product, orders }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [count, setCount] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant>();

  const findVariant = product[0].variants.filter(
    (v) => v.variant_id === Number(orders[0].variant_id)
  );

  const handleClickVariant = (variant: Variant) => {
    const { variant_id, variant_price } = variant;
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("variant", String(variant_id));
    newSearchParams.set("amount", String(variant_price * count));
    const newURL = `${pathname}?${newSearchParams.toString()}`;
    router.push(newURL);
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("quantity", String(count));

    const newURL = `${pathname}?${newSearchParams.toString()}`;
    router.push(newURL);
  }, [count]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("amount", String(count * findVariant[0].variant_price));

    const newURL = `${pathname}?${newSearchParams.toString()}`;
    router.push(newURL);
  }, []);

  return (
    <>
      <div>
        {product[0]?.variants.map((item, index) => (
          <Button
            key={index}
            type="button"
            variant="system"
            onClick={() => handleClickVariant(item)}
            className={classNames({
              "bg-blue-500": true,
              "bg-yellow-500":
                Number(searchParams.get("variant")) === item.variant_id,
            })}
          >
            {item.variant_symbol}
          </Button>
        ))}

        <AddtoCartButton product={product[0]} />
        <Button
          variant="secondary"
          onClick={() => setCount((prev) => prev + 1)}
        >
          <p>+</p>
        </Button>
        <Button
          variant="secondary"
          onClick={() => count > 1 && setCount((prev) => prev - 1)}
        >
          <p>-</p>
        </Button>
        <p>{count}</p>
        <Link
          href={{
            pathname: `/checkout`,
            query: {
              order: JSON.stringify(orders),
            },
          }}
        >
          <Button variant="submit">BUY NOW</Button>
        </Link>
      </div>
    </>
  );
};

export default ChoicesComponent;
