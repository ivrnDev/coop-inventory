import { Products } from "@/types/products/products";
import { getAllProducts } from "@/lib/api/products";
import AdminRenderProducts from "@/components/admin/products/render/Products";

const AdminProducts = async () => {
  const products: Products[] = await getAllProducts();
  return (
    <>
      <section className="h-admin-main p-5 overflow-hidden">
        <AdminRenderProducts products={products} />
      </section>
    </>
  );
};

export default AdminProducts;
