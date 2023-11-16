import { Products } from "@/types/products/products";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Products[];
};
const RenderProducts = ({ products }: Props) => {
  return (
    <>
      {products &&
        products.length > 0 &&
        products.map((product, index) => (
          <Link
            href={`
            /products/${product.product_name.toLowerCase()}?id=${
              product.product_id
            }`}
            key={index}
            className=""
          >
            <div className="bg-white h-64 w-full shadow-xl rounded-lg flex flex-col items-center p-2 hover:opacity-80 flex-1 md:h-72">
              <div className="relative w-full h-32 overflow-hidden rounded-md border border-black">
                <Image
                  src={`data:image/png;base64,${product.display_image}`}
                  alt={product.product_name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-3">
                <h1>{product.display_name}</h1>
                <p className="text-custom-orange mt-2">
                  ₱ {product.display_price}
                </p>
                <p className="mt-2">{product.product_stocks} stocks</p>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default RenderProducts;
