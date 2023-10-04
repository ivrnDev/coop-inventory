"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { CategoriesType } from "@/types/products/products";
import { createCategory } from "@/lib/api/products";

const CreateCategoriesForm = () => {
  const [formData, setFormData] = useState<CategoriesType>({
    category_name: "",
    category_image: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData({ ...formData, [fieldName]: fieldValue });
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFormData({
        ...formData,
        [fieldName]: selectedFile,
      });
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append("category_name", formData.category_name);
    form.append("category_image", formData.category_image);

    try {
      const response = await createCategory(form);
      if (response.status === 201) {
        console.log("Category created successfully");
        setFormData({
          category_name: "",
          category_image: "",
        });
        console.log(response.data);
      } else {
        console.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex place-items-center justify-center h-screen bg-slate-600">
      <div>
        <h1 className="text-center">CREATE Category</h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-orange-300 p-10 flex flex-col gap-5 w-fit h-fit "
        >
          <div>
            <label>Name</label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Image</label>
            <input
              type="file"
              name="category_image"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit">CREATE NOW</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoriesForm;
