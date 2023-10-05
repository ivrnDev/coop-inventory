import ProductModal from "@/components/user/modal/ProductModal";
import { getProductById } from "@/lib/api/products/getProductById";
import { ProductsType } from "@/types/products/products";

type Params = {
  params: {
    productId: string;
  };
};

const Order = async ({ params: { productId } }: Params) => {
  const product: ProductsType = await getProductById(productId);
  return (
    <>
      <ProductModal product={product} />
    </>
  );
};

export default Order;
