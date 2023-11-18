"use client";
import { Products } from "@/types/products/products";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Products[];
  search: string;
};

const RenderProducts = ({ products, search }: Props) => {
  const filteredProducts = products?.filter((product) =>
    product.category_name.toLowerCase().includes(search ?? "".toLowerCase())
  );
  return (
    <>
      {products?.length > 0 &&
        filteredProducts?.length > 0 &&
        filteredProducts?.map((product, index) => (
          <Link
            href={`
            /products/${product.product_name.toLowerCase()}?id=${
              product.product_id
            }`}
            key={index}
            className="h-fit "
          >
            <div className="bg-white h-64 w-full shadow-xl rounded-lg flex flex-col p-2 hover:opacity-80 flex-1 md:h-72">
              <div className="relative w-full h-32 overflow-hidden rounded-md border border-black">
                <Image
                  src={`data:image/png;base64,${product.display_image}`}
                  alt={product.product_name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-3 px-1">
                <h1 className="text-sm">{product.display_name}</h1>
                <p className="text-custom-orange mt-2 text-sm">
                  ₱ {product.display_price}
                </p>
                <p className="mt-2 text-sm opacity-75 max-w-xs text-ellipsis overflow-hidden whitespace-nowrap">
                  {product.product_stocks} stocks
                </p>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default RenderProducts;
