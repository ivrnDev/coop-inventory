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
      const items: ProductsType[] = products.flat();
      return (
        <section className="flex flex-col gap-5">
          {items.map((product, index) => (
            <div
              key={index}
              className="flex bg-white shadow-lg rounded-md h-fit "
            >
              <div className="relative w-20 h-20 object-contain">
                <Image
                  src={`data:image/png;base64,${product.display_image}`}
                  alt={product.product_name}
                  fill
                />
              </div>
              <h2>{product.product_name}</h2>
              <p>{product.display_price}</p>
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
