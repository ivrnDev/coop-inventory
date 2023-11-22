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
import classNames from "classnames";

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
      return router.push(`/products`);
    }
    router.push(`/products?category=${data.category_name}`);
  };

  return (
    <>
      <aside className="mt-user-header-mobile h-fit w-20 fixed top-2 left-6 z-50 md:mt-user-header md:top-10 md:w-fit md:left-10 md:h-64 md:overflow-y-auto">
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
                    <SelectItem value="all">All</SelectItem>
                    {categories?.map((category, index) => (
                      <SelectItem key={index} value={String(category.category_name)}>
                        <p className="capitalize">{category.category_name}</p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          )}
        />
        <h1 className="font-bold text-4xl hidden mb-3 md:block">Categories</h1>
        {categories && categories.length > 0 ? (
          <ul className="w-full text-black font-semibold mt-3 space-y-3 hidden md:block">
            <li>
              <Link
                href={`/products`}
                className={classNames({
                  "w-fit hover:text-blue-500 text-lg": true,
                })}
              >
                All Products
              </Link>
            </li>
            {categories.map((category) => (
              <li className="capitalize">
                <Link
                  key={category.category_id}
                  href={`/products?category=${category.category_name}`}
                  className={classNames({
                    "w-fit hover:text-blue-500 text-lg": true,
                  })}
                >
                  {category.category_name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg mt-4 hidden md:block">No available categories</p>
        )}
      </aside>
    </>
  );
};

export default CategoriesSidebar;
