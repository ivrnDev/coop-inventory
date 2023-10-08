import { getAllProducts } from "@/lib/api/products";
import { ProductsType } from "@/types/products/products";
import styles from "@/styles/pages/user/render/products.module.css";
import RenderProducts from "@/components/user/render/Products";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
const Products = async ({ searchParams }: Props) => {
  const selectedProduct = searchParams.id as string;
  const products: ProductsType[] = await getAllProducts();

  return (
    <section className={styles.section}>
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <RenderProducts key={product.product_id} product={product} />
        ))}

      {!products ||
        (products.length === 0 && (
          <p className={styles.no_available_products}>NO AVAILABLE PRODUCTS</p>
        ))}
    </section>
  );
};

export default Products;
