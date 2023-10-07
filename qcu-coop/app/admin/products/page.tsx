import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProductsType } from "@/types/products/products";
import { getAllProducts } from "@/lib/api/products";
import RenderProductsAdmin from "@/components/admin/products/render/Product";

const AdminProducts = async () => {
  const products: ProductsType[] = await getAllProducts();
  return (
    <>
      <section className="bg-yellow-200 h-48 w-full flex flex-row p-3 gap-3">
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

      <section className="bg-blue-200 h-fit px-9">
        <h1 className=" text-[2rem] text-center font-bold">PRODUCTS</h1>
        <div className="flex flex-col gap-6">
          <RenderProductsAdmin products={products} />
        </div>
      </section>
    </>
  );
};

export default AdminProducts;
