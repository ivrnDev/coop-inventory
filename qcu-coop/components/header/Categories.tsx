"use client";
import { getAllCategories } from "@/lib/api/categories";
import { Categories } from "@/types/products/products";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

const CategoriesSidebar = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Categories[]>([]);
  useEffect(() => {
    const getCategories = async () => {
      const categories: Categories[] = await getAllCategories();
      if (categories) setCategories(categories);
    };
    getCategories();
  }, []);

  const {  handleSubmit, control, setValue } = useForm({
    defaultValues: {
      category_name: "",
    },
  });

  const onSubmit = (data: { category_name: string }) => {
    router.push(`/product?category=${data.category_name}`);
  };

  return (
    <>
      <aside className="fixed top-10 left-10 mt-5 z-50">
        <Controller
          name="category_name"
          control={control}
          render={({ field }) => (
            <>
              <Select
                onValueChange={(newValue) => {
                  field.onChange(newValue);
                  setValue("category_name", newValue); // Set the value manually
                  handleSubmit(onSubmit)(); // Trigger form submission
                }}
                value={field.value}
              >
                <SelectTrigger id="category_name">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    {!categories && <SelectLabel>No Categories</SelectLabel>}
                    {categories?.map((category) => (
                      <SelectItem value={category.category_name}>
                        <p className="capitalize">{category.category_name}</p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          )}
        />

        {/* {categories && categories.length > 0 ? (
          <ul className="w-full text-black font-semibold mt-3 space-y-2">
            {categories.map((category) => (
              <Link
                key={category.category_id}
                href={`/products/${category.category_name}`}
              >
                <li>{category.category_name}</li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg mt-4">No available categories</p>
        )} */}
      </aside>
    </>
  );
};

export default CategoriesSidebar;
