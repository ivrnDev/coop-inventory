"use client";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/api/products/getProducts";
import Products from "@/components/user/products/Products";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <Products products={products} />
    </main>
  );
};

export default ProductsPage;
