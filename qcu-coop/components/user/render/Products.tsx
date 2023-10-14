import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/pages/user/render/products.module.css";
import { ProductsType } from "@/types/products/products";
import AddtoCartButton from "@/components/cart/AddtoCartBtn";
import { Button } from "@/components/ui/button";

type Props = {
  products: ProductsType[];
};

const RenderProducts = ({ products }: Props) => {
  return (
    <>
      {products &&
        products.length > 0 &&
        products.map((product, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.image_container}>
              <Image
                src={`data:image/png;base64,${product.display_image}`}
                alt={product.product_name}
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.product_info}>
              <h1>{product.display_name}</h1>
              <p className={styles.display_price}>₱ {product.display_price}</p>
              <div className={styles.sub_info}>
                <p className={styles.sold}>Sold {product.product_sold}</p>
                <p className={styles.stocks}>Stocks {product.product_stocks}</p>
              </div>
            </div>
            <div className={styles.buttons}>
              <AddtoCartButton product={product} />

              <Link
                scroll={false}
                href={`/products/${product.product_name.toLowerCase()}?id=${
                  product.product_id
                }`}
              >
                <Button size="sm">BUY NOW</Button>
              </Link>
            </div>
          </div>
        ))}
    </>
  );
};

export default RenderProducts;
