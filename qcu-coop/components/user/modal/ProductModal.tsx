import { ProductsType } from "@/types/products/products";
import Image from "next/image";

type Props = {
  product: ProductsType;
};

const ProductModal: React.FC<Props> = ({ product }) => {
  return (
    <>
      {product && (
        <div>
          <Image
            src={`data:image/png;base64,${product.display_image}`}
            alt={product.product_name}
            width={100}
            height={100}
          ></Image>
          <h1>{product.display_name}</h1>
          <p>{product.product_description}</p>
          
        </div>
      )}
    </>
  );
};

export default ProductModal;
