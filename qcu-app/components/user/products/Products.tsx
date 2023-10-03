import styles from "@/styles/user/products.module.css";
import Image from "next/image";
import { ProductsType } from "@/types/api/products/product";

type ProductProp = {
  products: ProductsType[];
};

const Products: React.FC<ProductProp> = ({ products }) => {
  return (
    <section className={styles.productContainer}>
      {products ? (
        <div className={styles.productContainer}>
          {products.map((product) => (
            <div key={String(product.product_id)} className={styles.card}>
              <Image
                src={`data:image/png;base64,${product.display_image}`}
                alt={product.product_name}
                width={100}
                height={100}
              />
              <h1 key={String(product.product_id)}>{product.display_name}</h1>
              <p>{product.display_price}</p>
              <p>Stocks: {product.product_stocks}</p>
              <p>Sold: {product.product_sold}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.error}>NO AVAILABLE PRODUCTS</div>
      )}
    </section>
  );
};

export default Products;
