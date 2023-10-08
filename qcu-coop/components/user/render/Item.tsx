import Image from "next/image";
import { getProductById } from "@/lib/api/products";
import { getVariantById } from "@/lib/api/variants";
import { VariantTypes } from "@/variants";

type Props = {
  productId: string;
};

const Item: React.FC<Props> = async ({ productId }) => {
  const product: any = await getProductById(productId);
  // const variants: VariantTypes[] = await getVariantById(productId);
  return (
    <>
      {productId && (
        <div className="flex">  
          <div className="relative h-[450px] w-[500px] rounded-md object-cover">
            <Image
              src={`data:image/png;base64,${product.display_image}`}
              alt={product.product_name}
              fill
            />
          </div>
          <div>
            <h1>{product.display_name}</h1>
            <p>{product.product_description}</p>
            {/* {variants.map((variant, index) => (
              <p key={index}>{variant.variant_name}</p>
            ))} */}
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
