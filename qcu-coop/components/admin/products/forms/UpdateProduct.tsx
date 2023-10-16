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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getProductById, updateProduct } from "@/lib/api/products";
import { ProductFormValues } from "@/types/form/products";
import { useEffect, useState } from "react";
import { CategoriesType, ProductsType } from "@/types/products/products";
import { getAllCategories } from "@/lib/api/categories";
type Props = {
  id: string;
};

const UpdateProductForm = ({ id }: Props) => {
  const [productData, setProductData] = useState<any>();
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const result = await getProductById(id);
        const getCategories = await getAllCategories();

        const {
          product_name,
          display_name,
          display_price,
          product_stocks,
          product_description,
          status,
          isFeatured,
          display_image,
          category_id,
        } = result[0];

        const defaultFormValues = {
          product_name: product_name || "",
          display_name: display_name || "",
          display_price: display_price || "",
          product_stocks: product_stocks ? String(product_stocks) : "",
          product_description: product_description || "",
          status: String(status) == "Active" ? "Active" : "Inactive",
          isFeatured: String(isFeatured) == "1" ? "1" : "0",
          display_image: display_image || "",
          category_id: category_id || "",
          variants: [
            {
              variant_name: "small",
              variant_symbol: "s",
              variant_price: "100",
              variant_stocks: "200",
            },
          ],
        };
        setCategories(getCategories);
        setProductData(defaultFormValues);
        reset(defaultFormValues);
      } catch (error) {
        console.error(error, "failed to fetch data");
      }
    };
    getProductData();
  }, []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    defaultValues: productData,
  });

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });

  const submitForm = async (data: ProductFormValues) => {
    const form = new FormData();
    const { variants, ...dataForm } = data;
    for (const key of Object.keys(dataForm) as (keyof typeof dataForm)[]) {
      form.append(key, data[key]);
    }
    form.append("variants", JSON.stringify(variants));

    try {
      const response = await updateProduct(form, id);
      console.log(data);
      if (response.status === 200) {
        console.log("Product updated successfully");
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
        Edit Product
      </div>
      <Card className="w-[60%] h-fit">
        <CardHeader>
          <CardTitle>EDIT PRODUCT</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="grid grid-cols-2 w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="product_name">Name</Label>
                <Input
                  {...register("product_name")}
                  id="product_name"
                  placeholder="Product Name"
                  autoComplete="off"
                  disabled
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  {...register("display_name")}
                  id="display_name"
                  placeholder="Display Name"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="display_price">Display Price</Label>
                <Input
                  {...register("display_price")}
                  id="display_price"
                  placeholder="Display Price"
                  autoComplete="off"
                />
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
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="product_description">Description</Label>
                <Input
                  {...register("product_description")}
                  id="product_description"
                  placeholder="Description"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Controller
                  name="display_image"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <>
                      <Label htmlFor="display_image">Image</Label>
                      <Input
                        {...field}
                        value={value?.fileName}
                        onChange={(event) => {
                          const selectedFile = event.target.files?.[0];
                          if (selectedFile) {
                            onChange(selectedFile);
                          }
                        }}
                        type="file"
                        id="picture"
                      />
                    </>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Label htmlFor="status">Status</Label>
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger id="status">
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
              </div>
              <div className="flex flex-col space-y-1.5">
                <Controller
                  name="isFeatured"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="featured">Featured</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="featured">
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
                        <SelectTrigger id="category_id">
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
              </div>
            </div>

            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Variant 1</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>ADD VARIANT</DialogTitle>
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
                        <input
                          {...register(
                            `variants.${index}.variant_name` as const
                          )}
                          id={`variants${index}.variant_name`}
                          className="col-span-3"
                          autoComplete="off"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label
                          htmlFor={`variants.${index}.variant_symbol`}
                          className="text-right"
                        >
                          Symbol
                        </label>
                        <input
                          {...register(
                            `variants.${index}.variant_symbol` as const
                          )}
                          id={`variants.${index}.variant_symbol`}
                          className="col-span-3"
                          autoComplete="off"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label
                          htmlFor={`variants.${index}.variant_price`}
                          className="text-right"
                        >
                          Price
                        </label>
                        <input
                          {...register(
                            `variants.${index}.variant_price` as const
                          )}
                          id={`variants.${index}.variant_price`}
                          className="col-span-3"
                          autoComplete="off"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label
                          htmlFor={`variants.${index}.variant_stocks`}
                          className="text-right"
                        >
                          Stocks
                        </label>
                        <input
                          {...register(
                            `variants.${index}.variant_stocks` as const
                          )}
                          id={`variants.${index}.variant_stocks`}
                          className="col-span-3"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  ))}

                  <DialogFooter>
                    <Button
                      type="button"
                      onClick={() =>
                        append({
                          variant_name: "",
                          variant_symbol: "",
                          variant_price: "",
                          variant_stocks: "",
                        })
                      }
                    >
                      Add Variant
                    </Button>
                    <Button type="submit">Save changes</Button>
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

export default UpdateProductForm;
