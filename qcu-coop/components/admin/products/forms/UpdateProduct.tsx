"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Textarea } from "@/components/ui/textarea";

import { ValidationMap, useEffect, useRef, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Image from "next/image";
import classNames from "classnames";
import { zodResolver } from "@hookform/resolvers/zod";

import { Categories, Product, ProductAlbum } from "@/types/products/products";
import { ProductSchema, ValidateProduct } from "@/middleware/zod/products";
import { deleteVariant } from "@/lib/api/variants";
import { getProductById, updateProduct } from "@/lib/api/products";
import { rolePermissions } from "@/lib/permission";
import Permission from "../../Permission";
import AddVariants from "./AddVariants";

type Props = {
  categories: Categories[];
  id: string;
};

type SelectedImage = {
  image: File | null;
  albums: File[] | [];
};

type ImageNumber = {
  image: number;
  albums: number;
};

const UpdateProductForm = ({ categories, id }: Props) => {
  const { toast } = useToast();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { restricted, moderate, unrestricted } = rolePermissions;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<number>(0);
  const [productItem, setProductItem] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<SelectedImage>({
    image: null,
    albums: [],
  });
  const [imageNumber, setImageNumber] = useState<ImageNumber>({
    image: 0,
    albums: 0,
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ValidateProduct>({
    resolver: zodResolver(ProductSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const item = await getProductById(id);
          handleImage(item);
        if (item && item.length > 0) {
          const defaultFormValues: ValidateProduct = {
            product_name: item[0].product_name || "",
            display_name: item[0].display_name || "",
            display_price: item[0].display_price || "",
            product_description: item[0].product_description || "",
            status: item[0].status == "active" ? "active" : "inactive",
            isFeatured: String(item[0].isFeatured) == "1" ? "1" : "0",
            category_id: String(item[0].category_id) || "",
            display_image: selectedImage.image,
            product_album: selectedImage.albums,
            variants:
              item[0].variants &&
              item[0].variants.map((variant: any) => ({
                variant_id: variant.variant_id || 0,
                variant_name: variant.variant_name || "",
                variant_symbol: variant.variant_symbol || "",
                variant_price: String(variant.variant_price) || "0",
                variant_stocks: String(variant.variant_stocks) || "0",
              })),
          };
          reset(defaultFormValues);
        }
      } catch (error) {
        console.log("failed to fetch data", error);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    setValue("display_image", selectedImage.image)
    setValue("product_album", selectedImage.albums);

  }, [selectedImage]);
  const handlePermission = async (permission: boolean, id?: number) => {
    if (permission) {
      setIsAllowed(true);
      id && setAdminId(id);
    }
    !isAllowed && buttonRef.current && buttonRef.current.click();
  };

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

  const handleImage = (productItem: Product[]) => {
    let newAlbums: any = [];
    const productImages = productItem[0];
    const image = productImages.display_image;
    if (image) {
      const blob = base64ToBlob(image, "image/png");
      const file = new File([blob], `image.png`, { type: "image/png" });
      setSelectedImage((prevFiles) => ({
        ...prevFiles,
        image: file,
      }));
      setImageNumber((prevCount) => ({
        ...prevCount,
        image: 1,
      }));
    }
    if (productImages.albums && productImages.albums.length > 0) {
      productImages.albums.map((photo) => {
        const blob = base64ToBlob(photo.product_photo, "image/png");
        const file = new File([blob], `image${photo.photo_id}.png`, {
          type: "image/png",
        });
        newAlbums.push(file);
      });
      setSelectedImage((prevFiles) => ({
        ...prevFiles,
        albums: newAlbums,
      }));
      setImageNumber((prevCount) => ({
        ...prevCount,
        albums: productImages.albums.length,
      }));
    }
  };

  const base64ToBlob = (base64: any, type: any) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  };

  const handlePrevNext = (action: number) => {
    if (action === 1) return setCurrentStep(1);
    return setCurrentStep(2);
  };
  const onSubmit = async (data: ValidateProduct) => {
    console.log(data);
    // try {
    //   const response = await updateProduct(data, id);
    //   if (response.status === 200) {
    //     console.log("Product updated successfully");
    //   } else {
    //     console.error("Failed to create Product");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 w-full h-full overflow-y-auto"
    >
      <RadioGroup defaultValue="variation" className="absolute flex w-full">
        <div className="flex items-center space-x-2 absolute right-72">
          <RadioGroupItem
            value="variation"
            id="variation"
            onClick={() => handlePrevNext(2)}
          />
          <Label htmlFor="variation">Variation</Label>
        </div>
        <div className="flex items-center space-x-2 absolute left-4">
          <RadioGroupItem
            value="product"
            id="product"
            onClick={() => handlePrevNext(1)}
          />
          <Label htmlFor="product">Product</Label>
        </div>
      </RadioGroup>
      {currentStep === 1 && (
        <>
          <div id="first-section" className="p-5 flex flex-col space-y-5">
            <Label className="font-bold">Images / Albums</Label>
            <div id="image-container" className="flex space-x-2">
              <div id="product-image-preview">
                <Dialog>
                  <DialogTrigger
                    className={classNames({
                      "bg-inputColor border border-black w-24 h-24 hover:cursor-pointer":
                        true,
                      "hover:cursor-default": !selectedImage.image,
                    })}
                  >
                    {selectedImage.image && (
                      <div
                        id="preview-image-container"
                        className="relative w-full h-full object-contain"
                      >
                        <Image
                          src={URL.createObjectURL(selectedImage.image)}
                          alt="Selected Image"
                          sizes="min-w-1"
                          fill
                        />
                      </div>
                    )}
                  </DialogTrigger>
                  {selectedImage.image && (
                    <DialogContent>
                      <AspectRatio ratio={10 / 10} className="absolute">
                        <Image
                          src={URL.createObjectURL(selectedImage.image)}
                          alt="Selected Image"
                          sizes="min-w-1"
                          fill
                          className="rounded-lg object-cover"
                        />
                      </AspectRatio>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
              <div id="product-album-preview">
                <Dialog>
                  <DialogTrigger
                    className={classNames({
                      "bg-inputColor border border-black w-24 h-24 hover:cursor-pointer":
                        true,
                      "hover:cursor-default": !selectedImage.albums[0],
                    })}
                  >
                    {selectedImage.albums[0] && (
                      <div
                        id="preview-image-container"
                        className="relative w-full h-full object-contain"
                      >
                        <Image
                          src={URL.createObjectURL(selectedImage.albums[0])}
                          alt="Selected Image"
                          sizes="min-w-1"
                          fill
                        />
                      </div>
                    )}
                  </DialogTrigger>
                  {selectedImage.albums && (
                    <DialogContent className="flex justify-center items-center">
                      <div
                        className={classNames({
                          "w-full h-[500px] gap-1 overflow-y-auto flex flex-wrap":
                            true,
                          "grid grid-cols-2": selectedImage.albums.length >= 4,
                        })}
                      >
                        {selectedImage.albums.map((album, index) => (
                          <AspectRatio ratio={1 / 1} key={index} className="">
                            <Image
                              src={URL.createObjectURL(album)}
                              alt="Selected Image"
                              sizes="min-w-1"
                              fill
                              className="rounded-lg object-cover"
                            />
                          </AspectRatio>
                        ))}
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
              <div className="flex">
                <Label
                  htmlFor="display_image"
                  className="bg-inputColor border border-black hover:cursor-pointer w-24 h-24 flex flex-col justify-center items-center"
                >
                  <div id="add-icon-container" className="relative w-10 h-10">
                    <Image
                      src="/icons/add-image-icon.svg"
                      alt="add-image-icon"
                      sizes="min-w-1"
                      fill
                    />
                  </div>
                  <p>{selectedImage.image ? "Edit Image" : "Add Image"}</p>
                  <p>{imageNumber.image}/1</p>
                </Label>
                <Controller
                  name="display_image"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <>
                      <Input
                        {...field}
                        onChange={(event) => {
                          const selectedFile = event.target.files;
                          if (selectedFile) {
                            const imageFile = selectedFile[0];
                            onChange(imageFile);
                            setSelectedImage((prevFiles) => ({
                              ...prevFiles,
                              image: imageFile,
                            }));
                            setImageNumber((prevCount) => ({
                              ...prevCount,
                              image: selectedFile.length,
                            }));
                          }
                        }}
                        type="file"
                        id="display_image"
                        className={classNames({
                          "border-red-600": errors.display_image,
                          hidden: true,
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
              <div className="flex">
                <Label
                  htmlFor="product_album"
                  className="bg-inputColor border border-black hover:cursor-pointer w-24 h-24 flex flex-col justify-center items-center"
                >
                  <div id="add-icon-container" className="relative w-10 h-10">
                    <Image
                      src="/icons/add-image-icon.svg"
                      alt="add-image-icon"
                      sizes="min-w-1"
                      fill
                    />
                  </div>
                  <p>{selectedImage.albums ? "Edit Image" : "Add Image"}</p>
                  <p>{imageNumber.albums}/10</p>
                </Label>
                <Controller
                  name="product_album"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <>
                      <Input
                        {...field}
                        onChange={(event) => {
                          const selectedFile = event.target.files;
                          if (selectedFile) {
                            const albumFiles = Array.from(selectedFile);
                            onChange(albumFiles);
                            setSelectedImage((prevFiles) => ({
                              ...prevFiles,
                              albums: albumFiles,
                            }));
                            setImageNumber((prevCount) => ({
                              ...prevCount,
                              ["albums"]: selectedFile.length,
                            }));
                          }
                        }}
                        type="file"
                        id="product_album"
                        multiple
                        className={classNames({
                          "border-red-600": errors.product_album,
                          hidden: true,
                        })}
                      />
                    </>
                  )}
                />
                {errors.product_album && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.product_album?.message}</>
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
              <Label htmlFor="product_name" className="font-bold">
                Name
              </Label>
              <Input
                {...register("product_name")}
                id="product_name"
                placeholder="Product Name"
                autoComplete="off"
                className={classNames({
                  "border-red-600": errors.product_name,
                  "bg-inputColor border-black": true,
                })}
              />
              {errors.product_name && (
                <p className="text-red-600 text-sm mt-2">
                  <>{errors.product_name?.message}</>
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
              <Label
                htmlFor="display_name"
                className="font-bold whitespace-nowrap"
              >
                Display Name
              </Label>
              <Input
                {...register("display_name")}
                id="display_name"
                placeholder="Display Name"
                autoComplete="off"
                className={classNames({
                  "border-red-600": errors.display_name,
                  "bg-inputColor border-black": true,
                })}
              />
              {errors.display_name && (
                <p className="text-red-600 text-sm mt-2">
                  <>{errors.display_name?.message}</>
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
              <Label
                htmlFor="display_price"
                className="font-bold whitespace-nowrap"
              >
                Display Price
              </Label>
              <Input
                {...register("display_price")}
                id="display_price"
                placeholder="Display Price"
                autoComplete="off"
                className={classNames({
                  "border-red-600": errors.display_price,
                  "bg-inputColor border-black": true,
                })}
              />
              {errors.display_price && (
                <p className="text-red-600 text-sm mt-2">
                  <>{errors.display_price?.message}</>
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
              <Label htmlFor="category_id" className="font-bold">
                Category
              </Label>
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        id="category_id"
                        className={classNames({
                          "border-red-600": errors.category_id,
                          "bg-inputColor border-black": true,
                        })}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          {!categories && (
                            <SelectLabel>No Categories</SelectLabel>
                          )}
                          {categories &&
                            categories.length > 0 &&
                            categories.map((category, index) => (
                              <SelectItem
                                value={`${String(category.category_id)}`}
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

          <div id="second-section" className="p-5 flex flex-col space-y-5">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
              <Label htmlFor="status" className="font-bold">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger
                        id="status"
                        className={classNames({
                          "border-red-600": errors.status,
                          "bg-inputColor border-black": true,
                        })}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
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

            <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
              <Label htmlFor="isFeatured" className="font-bold">
                Featured
              </Label>
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        id="isFeatured"
                        className={classNames({
                          "border-red-600": errors.isFeatured,
                          "bg-inputColor border-black": true,
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

            <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
              <Label htmlFor="product_description" className="font-bold">
                Description
              </Label>
              <Textarea
                {...register("product_description")}
                id="product_description"
                placeholder="Description"
                autoComplete="off"
                className={classNames({
                  "border-red-600": errors.product_description,
                  "bg-inputColor border-black": true,
                })}
              />
              {errors.product_description && (
                <p className="text-red-600 text-sm mt-2">
                  <>{errors.product_description?.message}</>
                </p>
              )}
            </div>
          </div>
          <Button
            variant="system"
            type="submit"
            // onClick={() => handlePrevNext("next")}
            className="absolute right-5 bottom-5 w-[12%] flex justify-center items-center"
          >
            <p className="text-lg">Next</p>
            <div className="absolute right-6  w-5 h-5">
              <Image
                src="/icons/right-chevron-icon.svg"
                alt="right-chevron"
                sizes="min-w-1"
                fill
              />
            </div>
          </Button>
        </>
      )}

      {currentStep === 2 && (
        <>
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
                              {errors.variants[index]?.variant_stocks?.message}
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
          <Button
            variant="system"
            type="button"
            onClick={() =>
              append({
                variant_name: "",
                variant_symbol: "",
                variant_price: "0",
                variant_stocks: "0",
              })
            }
            className="absolute right-10"
          >
            Add Variant
          </Button>
          <Button
            variant="system"
            type="button"
            // onClick={() => handlePrevNext("prev")}
            className="absolute left-5 bottom-5 w-[12%] flex justify-center items-center"
          >
            <div className="absolute left-6 w-5 h-5">
              <Image
                src="/icons/left-chevron-icon.svg"
                alt="left-chevron"
                sizes="min-w-1"
                fill
              />
            </div>
            <p className="text-lg">Prev</p>
          </Button>
          <Dialog>
            <DialogTrigger className="h-fit w-fit">
              <Button
                ref={buttonRef}
                variant="system"
                type="button"
                className="absolute right-5 bottom-5 w-[14%] flex space-x-3 "
              >
                <div className="relative w-5 h-5 float-left">
                  <Image
                    src="/icons/add-sign-icon.svg"
                    alt="add-sign"
                    sizes="min-w-1"
                    fill
                  />
                </div>
                <p className="text-lg whitespace-nowrap">
                  {isSubmitting ? "Update Item" : "Update Item"}
                </p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <Permission
                roles={moderate}
                handlePermission={handlePermission}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </form>
  );
};

export default UpdateProductForm;
