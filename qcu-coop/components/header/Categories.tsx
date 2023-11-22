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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import classNames from "classnames";

const CategoriesSidebar = () => {
  const router = useRouter();
  const params = useSearchParams();
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
      <aside className="mt-user-header-mobile h-fit w-20 fixed top-2 left-6 z-50 md:mt-user-header md:top-10 md:w-fit md:left-10 md:h-96 ">
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
                      <SelectItem
                        key={index}
                        value={String(category.category_name)}
                      >
                        <p className="capitalize">{category.category_name}</p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          )}
        />
        <h1 className="font-bold text-3xl hidden mb-3 md:block md:fixed">
          Categories
        </h1>
        {categories && categories.length > 0 ? (
          <ul className="hidden md:block w-44 text-black font-semibold mt-14 space-y-3 h-96 overflow-y-auto">
            <li>
              <Link
                href={`/products`}
                className={classNames({
                  "w-fit text-lg": true,
                  "text-blue-600": params.get("category") === null,
                })}
              >
                All Products
              </Link>
            </li>
            {categories.map((category, index) => (
              <li key={index} className="capitalize">
                <Link
                  key={index}
                  href={`/products?category=${category.category_name}`}
                  className={classNames({
                    "w-fit text-lg": true,
                    "text-blue-600":
                      params.get("category") === category.category_name,
                  })}
                >
                  {category.category_name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg mt-10 hidden md:block">
            No available categories
          </p>
        )}
      </aside>
    </>
  );
};

export default CategoriesSidebar;
