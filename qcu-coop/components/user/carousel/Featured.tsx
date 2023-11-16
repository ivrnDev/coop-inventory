"use client";
import { Featured, Products } from "@/types/products/products";
import Image from "next/image";
import Link from "next/link";

type Props = {
  featured: Featured[];
};

const FeaturedCarousel = ({ featured }: Props) => {
  return (
    <>
      {featured &&
        featured.length > 0 &&
        featured.map((product, index) => (
          <Link
            key={index}
            href={`
            /products/${product.product_name.toLowerCase()}?id=${
              product.product_id
            }`}
            className="flex flex-col hover: -80"
          >
            <div className="relative h-full w-20 overflow-hidden flex flex-col">
              <Image
                src={`data:image/png;base64,${product.display_image}`}
                alt={product.product_name}
                fill
                className="object-contain"
              />
            </div>
            <p className=" font-bold mt-2 text-center">
              ₱ {product.display_price}
            </p>
          </Link>
        ))}
    </>
  );
};

export default FeaturedCarousel;
