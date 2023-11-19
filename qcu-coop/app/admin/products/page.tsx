import { DeletedProducts, Products } from "@/types/products/products";
import { getAllProducts, getDeletedProducts } from "@/lib/api/products";
import AdminRenderProducts from "@/components/admin/products/render/Products";

const AdminProducts = async () => {
  const products: Products[] = await getAllProducts();
  const deletedProducts: DeletedProducts[] = await getDeletedProducts();
  return (
    <>
      <section className="h-admin-main p-5 overflow-hidden">
        <AdminRenderProducts
          products={products}
          deletedProducts={deletedProducts}
        />
      </section>
    </>
  );
};

export default AdminProducts;
