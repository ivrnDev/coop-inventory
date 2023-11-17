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

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      category_name: "",
    },
  });

  const onSubmit = (data: { category_name: string }) => {
    if (data.category_name === "all") {
      return router.push(`/product`);
    }
    router.push(`/product?category=${data.category_name}`);
  };

  return (
    <>
      <aside className="mt-user-header-mobile h-fit w-20 fixed top-2 left-6 z-50 md:mt-user-header md:top-5 md:w-fit md:left-6">
        <Controller
          name="category_name"
          control={control}
          render={({ field }) => (
            <>
              <Select
                onValueChange={(newValue) => {
                  field.onChange(newValue);
                  setValue("category_name", newValue);
                  handleSubmit(onSubmit)();
                }}
                value={field.value}
              >
                <SelectTrigger id="category_name" className="md:hidden">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    {!categories && <SelectLabel>No Categories</SelectLabel>}
                    <SelectItem value="all">All Categories</SelectItem>
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
        <h1 className="font-bold text-2xl hidden md:block">Categories</h1>
        {categories && categories.length > 0 ? (
          <ul className="w-full text-black font-semibold mt-3 space-y-3 hidden md:block">
            {categories.map((category) => (
              <li className="capitalize">
                <Link
                  key={category.category_id}
                  href={`/product?category=${category.category_name}`}
                  className="w-fit"
                >
                  {category.category_name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg mt-4">No available categories</p>
        )}
      </aside>
    </>
  );
};

export default CategoriesSidebar;
