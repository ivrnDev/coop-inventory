import { getAllProducts } from "@/lib/api/products";
import { Products } from "@/types/products/products";
import Image from "next/image";
import Link from "next/link";

const Products = async () => {
  const products: Products[] = await getAllProducts();
  return (
    <section className="ml-[35%] px-3 grid grid-cols-1 gap-4 place-items-center md:grid-cols-4">
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <Link
            href={`
            /products/${product.product_name.toLowerCase()}?id=${
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
    </section>
  );
};

export default Products;
