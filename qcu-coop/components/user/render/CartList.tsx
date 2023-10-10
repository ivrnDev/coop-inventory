import { getProductById } from "@/lib/api/products";
import { ProductsType } from "@/types/products/products";
import Image from "next/image";

type Props = {
  productId: number[] | undefined;
};

const CartItem = async ({ productId }: Props) => {
  if (productId && productId.length > 0) {
    const productPromises = productId.map((id) => getProductById(String(id)));

    try {
      const products: ProductsType[][] = await Promise.all(productPromises);
      const items: ProductsType[] = products.flat(1);
      return (
        <section className="flex flex-col gap-5">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex bg-white shadow-lg rounded-md h-fit "
            >
              <div className="relative w-20 h-20 object-contain">
                <Image
                  src={`data:image/png;base64,${product[0].display_image}`}
                  alt={product[0].product_name}
                  fill
                />
              </div>
              <h2>{product[0].product_name}</h2>
              <p>{product[0].display_price}</p>
              {/* Add more product details as needed */}
            </div>
          ))}
        </section>
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Return null or some other fallback if productId is empty or undefined
  return <div>CART IS EMPTY</div>;
};

export default CartItem;
