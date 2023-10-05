import { ProductsType } from "@/types/products/products";
import styles from "@/styles/pages/user/displayProducts.module.css";
import Button from "@/components/Button";
import Image from "next/image";

type RenderProductsProps = {
  products: ProductsType[];
};

const RenderProducts: React.FC<RenderProductsProps> = ({ products }) => {
  return (
    <>
      {products && products.length > 0 ? (
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
              <Button label={"ADD TO CART"} style={styles.add_cart} />
              <Button
                label={"BUY NOW"}
                style={styles.buy_now}
                link={`/products/${product.product_id}`}
              />
            </div>
          </div>
        ))
      ) : (
        <p className={styles.no_available_products}>
          NO AVAILABLE PRODUCTS
        </p>
      )}
    </>
  );
};

export default RenderProducts;
