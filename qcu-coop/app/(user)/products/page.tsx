import { getAllProducts } from "@/lib/api/products";
import { ProductsType } from "@/types/products/products";
import styles from "@/styles/pages/user/displayProducts.module.css";
import RenderProducts from "@/components/user/RenderProducts";

const Products = async () => {
  const productsList: ProductsType[] = await getAllProducts();
  return (
    <section className={styles.section}>
      <RenderProducts products={productsList} />
    </section>
  );
};

export default Products;
