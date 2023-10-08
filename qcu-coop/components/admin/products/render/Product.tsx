import { getAllProducts } from "@/lib/api/products";
import { ProductsType } from "@/types/products/products";
import styles from "@/styles/pages/admin/render/products.module.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  products: ProductsType[];
};

const RenderProductsAdmin: React.FC<Props> = async ({ products }) => {
  return (
    <>
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <div key={product.product_id} className={styles.card}>
            <div className={styles.image_container}>
              <Image
                src={`data:image/png;base64,${product.display_image}`}
                alt={product.product_name}
                fill
                className={styles.image}
              />
            </div>
            <div>
              <div className={styles.head}>
                <p>category</p>
                <p>id</p>
                <p>name</p>
                <p>display name</p>
                <p>display price</p>
                <p>description</p>
                <p>stocks</p>
                <p>featured</p>
                <p>date</p>
              </div>
              <div className={styles.product_info}>
                <p className="product_category">{product.category_id}</p>
                <p className="product_id">{product.product_id}</p>
                <p className="product_name">{product.product_name}</p>
                <p className="display_name">{product.display_name}</p>
                <p className="display_price">{product.display_price}</p>
                <p className="product_description">
                  {product.product_description}
                </p>
                <p className="product_stocks">{product.product_stocks}</p>
                <p className="isFeatured">{product.isFeatured}</p>
                {product.date_created && (
                  <p className="date_created">
                    {product.date_created.substring(0, 10)}
                  </p>
                )}
                <div className={styles.button_container}>
                  <button>FEATURED</button>
                  <button>ACTIVE</button>
                  <button>DELETE</button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default RenderProductsAdmin;
