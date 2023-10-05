import { Card } from "@/components/ui/card";
import { getProductById } from "@/lib/api/products/getProductById";
import { ProductsType } from "@/types/products/products";
import Image from "next/image";

type Params = {
  params: {
    productId: string;
  };
};

const Order = async ({ params: { productId } }: Params) => {
  const product: ProductsType = await getProductById(productId);
  return (
    <>
      {product && (
        <>
          <Image
            src={`data:image/png;base64,${product.display_image}`}
            alt={product.product_name}
            width={100}
            height={100}
          ></Image>
          <h1>{product.display_name}</h1>
          <p>{product.product_description}</p>
        </>
      )}
    </>
  );
};

export default Order;
