import { getAllProducts } from "@/lib/api/products";
import { products } from "@/types/products/products";
import styles from "@/styles/pages/user/displayProducts.module.css";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

const Products = async () => {
  const products: products[] = await getAllProducts();
  return (
    <section className={styles.section}>
      {products ? (
        products.map((product) => (
          <div key={product.product_id} className={styles.card}>
            <div className={styles.image_container}>
              <Image
                src={`data:image/png;base64,${product.display_image}`}
                alt={product.product_name}
                width={150}
                height={150}
              />
            </div>
            <div className={styles.product_info}>
              <h1>{product.display_name}</h1>
              <p>{product.display_price}</p>
              <p>Sold {product.product_sold}</p>
              <p>Stocks {product.product_stocks}</p>
            </div>
            <div className={styles.buttons}>
              <Button label={'ADD TO CART'} style={styles.button}/>
              <Button label={'BUY NOW'} style={styles.button} onclick={null} link={`/`}/>
             
            </div>
          </div>
        ))
      ) : (
        <div>NO AVAILABLE PRODUCTS</div>
      )}
    </section>
  );
};

export default Products;
