import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProductsType } from "@/types/products/products";
import { getAllProducts } from "@/lib/api/products";
import AdminRenderProducts from "@/components/admin/products/render/Products";

const AdminProducts = async () => {
  const products: ProductsType[] = await getAllProducts();
  return (
    <>
      <section className="h-48 w-full flex flex-row p-3 gap-3">
        <Link
          href="products/new"
          className="bg-green-600 text-white text-lg p-5 flex align-middle justify-center w-fit h-fit"
        >
          ADD PRODUCT
        </Link>

        <Link
          href="products/categories/new"
          className="bg-blue-600 text-white text-lg p-5 flex align-middle justify-center w-fit h-fit"
        >
          CREATE CATEGORIES
        </Link>
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
