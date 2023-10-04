"use client";
import { createProduct } from "@/lib/api/products";
import { ProductsType } from "@/types/products/products";
import { ChangeEvent, useState } from "react";

const CreateProductForm = () => {
  const [formData, setFormData] = useState<ProductsType>({
    category_id: 0,
    product_name: "",
    display_name: "",
    display_price: "",
    product_stocks: 0,
    product_description: "",
    product_sold: 0,
    status: "",
    isFeatured: 0,
    isDeleted: 0,
    variant_name: "",
    variant_symbol: "",
    variant_price: 0,
    variant_stocks: 0,
    display_image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData({ ...formData, [fieldName]: fieldValue });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFormData({ ...formData, [fieldName]: selectedFile });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    for (const key of Object.keys(formData) as (keyof typeof formData)[]) {
      form.append(key, formData[key]);
    }

    try {
      const response = await createProduct(form);
      if (response.status === 201) {
        console.log("Product created successfully");
        setFormData({
          category_id: 0,
          product_name: "",
          display_name: "",
          display_price: "",
          product_stocks: 0,
          product_description: "",
          status: "",
          isFeatured: 0,
          isDeleted: 0,
          variant_name: "",
          variant_symbol: "",
          variant_price: 0,
          variant_stocks: 0,
          display_image: null,
        });
        console.log(response.data);
      } else {
        console.error("Failed to create Product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex place-items-center justify-center h-screen bg-slate-600">
        <div>
          <h1 className="text-center">Create Product</h1>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="bg-blue-300 p-10 flex flex-col gap-5 w-fit h-fit "
          >
            <div>
              <label>Category</label>
              <input
                type="text"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Product Name</label>
              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Display Name</label>
              <input
                type="text"
                name="display_name"
                value={formData.display_name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Product Description</label>
              <input
                type="text"
                name="product_description"
                value={formData.product_description}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Display Price</label>
              <input
                type="text"
                name="display_price"
                value={formData.display_price}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Featured</label>
              <input
                type="text"
                name="isFeatured"
                value={formData.isFeatured}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <label>DELETE</label>
              <input
                type="text"
                name="isDeleted"
                value={formData.isDeleted}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Display Image</label>
              <input
                type="file"
                name="display_image"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label>Variant Name</label>
              <input
                type="text"
                name="variant_name"
                value={formData.variant_name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Variant Symbol</label>
              <input
                type="text"
                name="variant_symbol"
                value={formData.variant_symbol}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Variant Price</label>
              <input
                type="text"
                name="variant_price"
                value={formData.variant_price}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Variant Stocks</label>
              <input
                type="text"
                name="variant_stocks"
                value={formData.variant_stocks}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <button type="submit">CREATE NOW</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProductForm;
