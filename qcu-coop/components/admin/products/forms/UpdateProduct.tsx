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
import { updateProduct } from "@/lib/api/products";
import { ProductFormValues } from "@/types/form/products";
type Props = {
  id: string;
};

const UpdateProductForm = ({ id }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const submitForm = async (data: ProductFormValues) => {
    console.log(data);
    // try {
    //   const response = await updateProduct(data, id);
    //   console.log(data);
    //   if (response.status === 201) {
    //     console.log("Product updated successfully");
    //   } else {
    //     console.error("Failed to create Product");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
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
                  render={({ field }) => (
                    <>
                      <Label htmlFor="display_image">Image</Label>
                      <Input
                        
                        type="file"
                        id="display_image"
                      />
                    </>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="1">Active</SelectItem>
                          <SelectItem value="0">Inactive</SelectItem>
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
                      <Label htmlFor="featured">Status</Label>
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
            </div>

            <div>
              {/* <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Variant 1</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>ADD VARIANT</DialogTitle>
                  </DialogHeader>

                  {fields.map((variant, index) => (
                    <div key={variant.id} className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor={`variants.${index}.variant_name`}
                          className="text-right"
                        >
                          Name
                        </Label>
                        <Input
                          {...register(`variants.${index}.variant_name` as const, {
                            required: true
                          })}
                          id="variant_name"
                          className="col-span-3"
                          autoComplete="off"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="variant_symbol" className="text-right">
                          Symbol
                        </Label>
                        <Input
                          {...register("variant_symbol")}
                          id="variant_symbol"
                          className="col-span-3"
                          autoComplete="off"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="variant_price" className="text-right">
                          Price
                        </Label>
                        <Input
                          {...register("variant_price")}
                          id="variant_price"
                          className="col-span-3"
                          autoComplete="off"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="variant_stocks" className="text-right">
                          Stocks
                        </Label>
                        <Input
                          {...register("variant_stocks")}
                          id="variant_stocks"
                          className="col-span-3"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  ))}

                  <DialogFooter>
                    <Button type="button" onClick={() => append({})}>
                      Add Variant
                    </Button>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog> */}
            </div>
            <Button type="submit">SUBMIT</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProductForm;