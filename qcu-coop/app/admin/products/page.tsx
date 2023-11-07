import Link from "next/link";
import { Products } from "@/types/products/products";
import { getAllProducts } from "@/lib/api/products";
import AdminRenderProducts from "@/components/admin/products/render/Products";
import CreateCategoriesForm from "@/components/admin/products/forms/CreateCategories";
import UpdateCategoriesForm from "@/components/admin/products/forms/UpdateCategories";

const AdminProducts = async () => {
  const products: Products[] = await getAllProducts();
  console.log(products)
  return (
    <>
      <section className="h-48 w-full flex flex-row p-3 gap-3">
        <Link
          href="products/new"
          className="bg-green-600 text-white text-lg p-5 flex align-middle justify-center w-fit h-fit"
        >
          ADD PRODUCT
        </Link>
        <CreateCategoriesForm />
        <UpdateCategoriesForm />
      </section>

      <section className="h-fit px-9">
        <div className="flex flex-col gap-6">
          <AdminRenderProducts products={products} />
        </div>
      </section>
    </>
  );
};

export default AdminProducts;
