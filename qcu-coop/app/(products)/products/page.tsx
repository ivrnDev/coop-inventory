import { getAllProducts } from "@/lib/api/products";
import { ProductsType } from "@/types/products/products";
import styles from "@/styles/pages/user/render/products.module.css";
import ProductModal from "@/components/user/modals/Product";
import RenderProducts from "@/components/user/render/Products";

interface Params {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Products = async ({ searchParams }: Params) => {
  const selectedProduct = searchParams.item as string;
  const products: ProductsType[] = await getAllProducts();

  return (
    <section className={styles.section}>
      {products && products.length > 0 && (
        <RenderProducts products={products} />
      )}
      {searchParams && <ProductModal productId={selectedProduct} />}
      {!products ||
        (products.length === 0 && (
          <p className={styles.no_available_products}>NO AVAILABLE PRODUCTS</p>
        ))}
    </section>
  );
};

export default Products;
