import Image from "next/image";
import Link from "next/link";
import { ProductsType } from "@/types/products/products";
import AddtoCartButton from "@/components/cart/AddtoCartBtn";
import { Button } from "@/components/ui/button";

type Props = {
  products: ProductsType[];
};

const RenderProducts = ({ products }: Props) => {
  return (
    <>
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <Link
            href={`/products/${product.product_name.toLowerCase()}?id=${
              product.product_id
            }`}
            key={index}
            className="w-fit"
          >
            <div className="bg-white h-60 w-40 shadow-xl rounded-lg flex flex-col items-center p-2">
              <div className="relative w-full h-28 object-contain object-center border border-black">
                <Image
                  src={`data:image/png;base64,${product.display_image}`}
                  alt={product.product_name}
                  fill
                />
              </div>
              <div className="">
                <h1>{product.display_name}</h1>
                <p className="text-custom-orange">₱ {product.display_price}</p>
                <div className="">
                  <p className="">{product.product_stocks} stocks</p>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="absolute top-48">
          <p className="font-bold text-xl">NO PRODUCTS AVAILABLE</p>
        </div>
      )}
    </>
  );
};

export default RenderProducts;
