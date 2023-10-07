import Image from "next/image";
import productModal from "@/styles/modals/productModal.module.css";
import { getProductById } from "@/lib/api/products";
type Props = {
  productId: string;
};

const ProductModal: React.FC<Props> = async ({ productId }) => {
  const product = await getProductById(productId);
  return (
    <>
      {productId && (
        <div className="">
          <div className="relative h-[200px] w-[200px] rounded-md object-cover">
            <Image
              src={`data:image/png;base64,${product.display_image}`}
              alt={product.product_name}
              layout="fill"
            />
          </div>

          <h1>{product.display_name}</h1>
          <p>{product.product_description}</p>
        </div>
      )}
    </>
  );
};

export default ProductModal;
