import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/pages/user/render/products.module.css";
import { ProductsType } from "@/types/products/products";

interface Props {
  products: ProductsType[];
}

const RenderProducts: React.FC<Props> = ({ products }) => {
  return (
    <>
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <div key={product.product_id} className={styles.card}>
            <div className={styles.image_container}>
              <Image
                src={`data:image/png;base64,${product.display_image}`}
                alt={product.product_name}
                layout="fill"
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
              <button>ADD TO CART</button>
              <Link
                scroll={false}
                href={`?${new URLSearchParams({
                  item: String(product.product_id),
                })}`}
              >
                BUY NOW
              </Link>
            </div>
          </div>
        ))}
    </>
  );
};

export default RenderProducts;
