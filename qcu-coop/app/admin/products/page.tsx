import Link from "next/link";
import React from "react";

const AdminProducts = () => {
  return (
    <>
      <section className="bg-yellow-200 h-48 w-full flex flex-row}">
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

      <section className="bg-blue-200 h-fit">
        <h1>PRODUCTS</h1>
      </section>
    </>
  );
};

export default AdminProducts;
