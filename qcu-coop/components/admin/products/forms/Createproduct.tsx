"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/lib/api/products";
import { ProductFormValues } from "@/types/form/products";
import { useEffect, useState } from "react";
import { CategoriesType } from "@/types/products/products";
import { getAllCategories } from "@/lib/api/categories";
import { z } from "zod";
import { ProductSchema } from "@/middleware/zod/products";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";

type ValidationProduct = z.infer<typeof ProductSchema>;

const CreateProductForm = () => {
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const getCategories = await getAllCategories();
        setCategories(getCategories);
      } catch (error) {
        console.error(error, "failed to fetch data");
      }
    };
    getCategories();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ValidationProduct>({
    resolver: zodResolver(ProductSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });

  const submitForm = async (data: ProductFormValues) => {
    const form = new FormData();
    const { variants, ...newData } = data;
    for (const key of Object.keys(newData) as (keyof typeof newData)[]) {
      form.append(key, newData[key]);
    }
    form.append("variants", JSON.stringify(variants));
    try {
      const response = await createProduct(form);
      if (response.status === 201) {
        console.log("Product created successfully");
      } else {
        console.error("Failed to create Product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative w-[95%] h-[500px] rounded-md flex items-center p-7 border border-solid border-black">
      <div className="absolute bg-header-admin w-[100%] h-10 top-0 left-0 justify-center text-white text-[1.2rem] rounded-t-md flex items-center font-bold flex-shrink">
        CREATE PRODUCT
      </div>
      <Card className="w-[60%] h-fit">
        <CardHeader>
          <CardTitle>CREATE PRODUCT</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="grid grid-cols-2 w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Controller
                  name="display_image"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <>
                      <Label htmlFor="display_image">Image</Label>
                      <Input
                        {...field}
                        onChange={(event) => {
                          const selectedFile = event.target.files?.[0];
                          if (selectedFile) {
                            onChange(selectedFile);
                          }
                        }}
                        type="file"
                        id="display_image"
                        className={classNames({
                          "border-red-600": errors.display_image,
                        })}
                      />
                    </>
                  )}
                />
                {errors.display_image && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.display_image?.message}</>
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="product_name">Name</Label>
                <Input
                  {...register("product_name")}
                  id="product_name"
                  placeholder="Product Name"
                  autoComplete="off"
                  className={classNames({
                    "border-red-600": errors.product_name,
                  })}
                />
                {errors.product_name && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.product_name?.message}</>
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  {...register("display_name")}
                  id="display_name"
                  placeholder="Display Name"
                  autoComplete="off"
                  className={classNames({
                    "border-red-600": errors.display_name,
                  })}
                />
                {errors.display_name && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.display_name?.message}</>
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="display_price">Display Price</Label>
                <Input
                  {...register("display_price")}
                  id="display_price"
                  placeholder="Display Price"
                  autoComplete="off"
                  className={classNames({
                    "border-red-600": errors.display_price,
                  })}
                />
                {errors.display_price && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.display_price?.message}</>
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="product_stocks">Stocks</Label>
                <Input
                  {...register("product_stocks")}
                  type="number"
                  id="product_stocks"
                  placeholder="0"
                  min="0"
                  autoComplete="off"
                  className={classNames({
                    "border-red-600": errors.product_stocks,
                  })}
                />
                {errors.product_stocks && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.product_stocks?.message}</>
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="product_description">Description</Label>
                <Input
                  {...register("product_description")}
                  id="product_description"
                  placeholder="Description"
                  autoComplete="off"
                  className={classNames({
                    "border-red-600": errors.product_description,
                  })}
                />
                {errors.product_description && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.product_description?.message}</>
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Label htmlFor="status">Status</Label>
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger
                          id="status"
                          className={classNames({
                            "border-red-600": errors.status,
                          })}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  )}
                />
                {errors.status && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.status?.message}</>
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Controller
                  name="isFeatured"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="isFeatured">Featured</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="isFeatured"
                          className={classNames({
                            "border-red-600": errors.isFeatured,
                          })}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="1">Yes</SelectItem>
                          <SelectItem value="0">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  )}
                />
                {errors.isFeatured && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.isFeatured?.message}</>
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="category_id">Category</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="category_id"
                          className={classNames({
                            "border-red-600": errors.category_id,
                          })}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        {categories.length > 0 &&
                          categories.map((category, index) => (
                            <SelectContent key={index} position="popper">
                              <SelectItem value={`${category.category_id}`}>
                                {category.category_name}
                              </SelectItem>
                            </SelectContent>
                          ))}
                      </Select>
                    </>
                  )}
                />
                {errors.category_id && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.category_id?.message}</>
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-5">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"}>Create Variants</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>CREATE VARIANT</DialogTitle>
                  </DialogHeader>
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label
                          htmlFor={`variants.${index}.variant_name`}
                          className="text-right"
                        >
                          Name
                        </label>
                        <Input
                          {...register(
                            `variants.${index}.variant_name` as const
                          )}
                          id={`variants${index}.variant_name`}
                          autoComplete="off"
                          className={classNames({
                            "border-red-600":
                              errors.variants &&
                              errors.variants[index]?.variant_name,
                            "col-span-3": true,
                          })}
                        />
                        {errors.variants && (
                          <p className="text-red-600 text-sm mt-2">
                            <>{errors.variants[index]?.variant_name?.message}</>
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <label
                          htmlFor={`variants.${index}.variant_symbol`}
                          className="text-right"
                        >
                          Symbol
                        </label>
                        <Input
                          {...register(
                            `variants.${index}.variant_symbol` as const
                          )}
                          id={`variants.${index}.variant_symbol`}
                          autoComplete="off"
                          className={classNames({
                            "border-red-600":
                              errors.variants &&
                              errors.variants[index]?.variant_symbol,
                            "col-span-3": true,
                          })}
                        />
                        {errors.variants && (
                          <p className="text-red-600 text-sm mt-2">
                            <>
                              {errors.variants[index]?.variant_symbol?.message}
                            </>
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label
                          htmlFor={`variants.${index}.variant_price`}
                          className="text-right"
                        >
                          Price
                        </label>
                        <Input
                          {...register(
                            `variants.${index}.variant_price` as const
                          )}
                          type="number"
                          id={`variants.${index}.variant_price`}
                          autoComplete="off"
                          className={classNames({
                            "border-red-600":
                              errors.variants &&
                              errors.variants[index]?.variant_price,
                            "col-span-3": true,
                          })}
                        />
                        {errors.variants && (
                          <p className="text-red-600 text-sm mt-2">
                            <>
                              {errors.variants[index]?.variant_price?.message}
                            </>
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label
                          htmlFor={`variants.${index}.variant_stocks`}
                          className="text-right"
                        >
                          Stocks
                        </label>
                        <Input
                          {...register(
                            `variants.${index}.variant_stocks` as const
                          )}
                          type="number"
                          id={`variants.${index}.variant_stocks`}
                          autoComplete="off"
                          className={classNames({
                            "border-red-600":
                              errors.variants &&
                              errors.variants[index]?.variant_stocks,
                            "col-span-3": true,
                          })}
                        />
                        {errors.variants && (
                          <p className="text-red-600 text-sm mt-2">
                            <>
                              {errors.variants[index]?.variant_stocks?.message}
                            </>
                          </p>
                        )}
                        <Button variant="default" onClick={() => remove(index)}>
                          DELETE
                        </Button>
                      </div>
                    </div>
                  ))}

                  <DialogFooter>
                    <Button
                      variant="default"
                      onClick={() =>
                        append({
                          variant_name: "",
                          variant_symbol: "",
                          variant_price: "0",
                          variant_stocks: "0",
                        })
                      }
                    >
                      Add Variant
                    </Button>
                    <DialogClose>Save changes</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Button type="submit">SUBMIT</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProductForm;
