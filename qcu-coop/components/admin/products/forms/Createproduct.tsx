"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import classNames from "classnames";

import { CategoriesType } from "@/types/products/products";
import { ProductSchema } from "@/middleware/zod/products";
import { createProduct } from "@/lib/api/products";
import { getAllCategories } from "@/lib/api/categories";

type ValidationProduct = z.infer<typeof ProductSchema>;

const steps = [
  {
    step: 1,
    name: "Product Information",
    fields: [
      "product_name",
      "display_name",
      "display price",
      "product_description",
      "status",
      "isFeatured",
      "category_id",
      "display_image",
    ],
  },
  { step: 2, name: "Variants", fields: ["variants"] },
];

const CreateProductForm = () => {
  const [categories, setCategories] = useState<CategoriesType[] | null>([]);
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ValidationProduct>({
    resolver: zodResolver(ProductSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const getCategories = await getAllCategories();
        if (!getCategories) return setCategories(null);
        setCategories(getCategories);
      } catch (error) {
        console.error(error, "Failed to fetch categories");
      }
    };
    getCategories();
  }, []);

  const submitForm = async (data: ValidationProduct) => {
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
    <form onSubmit={handleSubmit(submitForm)} className="flex">
      <div className="">
        <div className="flex ">
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
          <Label htmlFor="product_description">Description</Label>
          <Textarea
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
                <Select onValueChange={field.onChange} value={field.value}>
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id="category_id"
                    className={classNames({
                      "border-red-600": errors.category_id,
                    })}
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      {!categories && <SelectLabel>No Categories</SelectLabel>}
                      {categories &&
                        categories.length > 0 &&
                        categories.map((category, index) => (
                          <SelectItem
                            value={`${category.category_id}`}
                            key={index}
                          >
                            {category.category_name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
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

      {/* Variants */}
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
                    {...register(`variants.${index}.variant_name` as const)}
                    id={`variants${index}.variant_name`}
                    autoComplete="off"
                    className={classNames({
                      "border-red-600":
                        errors.variants && errors.variants[index]?.variant_name,
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
                    {...register(`variants.${index}.variant_symbol` as const)}
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
                      <>{errors.variants[index]?.variant_symbol?.message}</>
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
                    {...register(`variants.${index}.variant_price` as const)}
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
                      <>{errors.variants[index]?.variant_price?.message}</>
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
                    {...register(`variants.${index}.variant_stocks` as const)}
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
                      <>{errors.variants[index]?.variant_stocks?.message}</>
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
      <Button type="submit">{isSubmitting ? "Submitting" : "Submit"}</Button>
    </form>
  );
};

export default CreateProductForm;
