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
import { getProductById, updateProduct } from "@/lib/api/products";
import { ProductFormValues } from "@/types/form/products";
import { useEffect, useState } from "react";
import { CategoriesType, ProductsType } from "@/types/products/products";
import { getAllCategories } from "@/lib/api/categories";
import UpdateImageModal from "./UpdateImage";
import AddVariants from "./AddVariants";
import { deleteVariant } from "@/lib/api/variants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { UpdateProductSchema } from "@/middleware/zod/updateProducts";

type Props = {
  id: string;
};

type ValidateProduct = z.infer<typeof UpdateProductSchema>;

const UpdateProductForm = ({ id }: Props) => {
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const result = await getProductById(id);
        const getCategories = await getAllCategories();
        if (result && result.length > 0) {
          const {
            product_name,
            display_name,
            display_price,
            product_stocks,
            product_description,
            status,
            isFeatured,
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
            category_id: category_id || "",
            variants:
              result &&
              result.map((value: any) => ({
                variant_id: value.variant_id || 0,
                variant_name: value.variant_name || "",
                variant_symbol: value.variant_symbol || "",
                variant_price: value.variant_price || 0,
                variant_stocks: value.variant_stocks || 0,
              })),
          };
          setCategories(getCategories);
          reset(defaultFormValues);
        }
      } catch (error) {
        console.error(error, "failed to fetch data");
      }
    };
    getProductData();
  }, []);

  const handleRemoveForm = async (index: number, field: any) => {
    try {
      if (index > 0) {
        const response = await deleteVariant(id, field.variant_id);
        if (response.status === 200) {
          console.log("Variant deleted successfully");
        } else {
          console.error("Failed to delete variant");
        }
        remove(index);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm<ValidateProduct>({
    resolver: zodResolver(UpdateProductSchema),
  });

  const { fields, remove } = useFieldArray({
    name: "variants",
    control,
  });

  const submitForm = async (data: ValidateProduct) => {
    try {
      const response = await updateProduct(data, id);
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
                      <Label htmlFor="featured">Featured</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="featured"
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
                        <SelectContent position="popper">
                          {categories.length > 0 &&
                            categories.map((category, index) => (
                              <SelectItem
                                value={`${category.category_id}`}
                                key={index}
                              >
                                {category.category_name}
                              </SelectItem>
                            ))}
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

            <div className="flex space-x-5">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"}>Edit Variants</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>EDIT VARIANT</DialogTitle>
                  </DialogHeader>
                  {fields && fields.length > 0 ? (
                    fields.map((field, index) => (
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
                              <>
                                {errors.variants[index]?.variant_name?.message}
                              </>
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
                          <input
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
                                {
                                  errors.variants[index]?.variant_symbol
                                    ?.message
                                }
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
                          <input
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
                          <input
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
                                {
                                  errors.variants[index]?.variant_stocks
                                    ?.message
                                }
                              </>
                            </p>
                          )}
                          <Button
                            variant="default"
                            onClick={() => handleRemoveForm(index, field)}
                          >
                            DELETE
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>NO EXISTING VARIANTS</div>
                  )}

                  <DialogFooter>
                    <DialogClose>
                      <div>Save changes</div>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Button type="submit" disabled={isSubmitSuccessful}>
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </form>
          <AddVariants productId={id} />
        </CardContent>
      </Card>
      <UpdateImageModal productId={id} />
    </div>
  );
};

export default UpdateProductForm;
