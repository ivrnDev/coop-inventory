import { useEffect, useRef, useState } from "react";

import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import classNames from "classnames";

import Permission from "../../Permission";
import AddVariants from "./AddVariants";
import { rolePermissions } from "@/lib/permission";
import { ValidateVariant, VariantSchema } from "@/middleware/zod/variant";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import {
  deleteVariant,
  getVariantByProductId,
  updateVariant,
} from "@/lib/api/variants";
import { createActivity } from "@/lib/api/activity";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  productId: string;
  productName: string;
};

const UpdateVariant = ({ productId, productName }: Props) => {
  const { toast } = useToast();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { restricted, moderate, unrestricted } = rolePermissions;
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<number>(0);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ValidateVariant>({
    resolver: zodResolver(VariantSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const item = await getVariantByProductId(productId);
        if (item && item.length > 0) {
          const defaultFormValues: ValidateVariant = {
            variants:
              item &&
              item.map((variant: any) => ({
                id: variant.id || 0,
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
        console.log("failed to fetch variants", error);
      }
    };
    getProduct();
  }, []);

  const handleRemoveForm = async (index: number, field: any) => {
    try {
      if (index > 0) {
        const response = await deleteVariant(productId, field.variant_id);
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

  const handlePermission = async (permission: boolean, id?: number) => {
    if (permission) {
      setIsAllowed(true);
      id && setAdminId(id);
    }
    !isAllowed && buttonRef.current && buttonRef.current.click();
  };

  const onSubmit = async (data: ValidateVariant) => {
    console.log(data);
    if (isAllowed) {
      try {
        const response = await updateVariant(data, productId);
        if (response.status === 200) {
          await createActivity(
            {
              action: "updated",
              target: "variants",
              object: `${productName}`,
            },
            adminId
          );
          toast({
            description: `You have successfully updated ${productName} variants.`,
          });
        } else {
          toast({
            variant: "destructive",
            title: `Failed to Update ${productName} variants.`,
            description: `${response.data.message}`,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  useEffect(() => {
    if (isAllowed) {
      handleSubmit(onSubmit)();
      setIsAllowed(false);
    }
  }, [isAllowed]);

  return (
    <>
      <div
        id="variant-container"
        className="grid grid-cols-2 bg-[#37B3E2] mt-5"
      >
        {fields.map((field, index) => (
          <div key={field.id} className="p-2 flex flex-col space-y-3">
            <div className="flex items-center">
              <Label
                htmlFor={`variants.${index}.variant_name`}
                className="font-bold"
              >
                Name
              </Label>
              <div>
                <Input
                  {...register(`variants.${index}.variant_name` as const)}
                  id={`variants${index}.variant_name`}
                  autoComplete="off"
                  placeholder="small e.g"
                  className={classNames({
                    "border-red-600":
                      errors.variants && errors.variants[index]?.variant_name,
                  })}
                />
                {errors.variants && (
                  <p className="text-red-600 text-sm text-center">
                    <>{errors.variants[index]?.variant_name?.message}</>
                  </p>
                )}
              </div>
            </div>
            <div className="flex">
              <label
                htmlFor={`variants.${index}.variant_symbol`}
                className="text-right"
              >
                Symbol
              </label>
              <div>
                <Input
                  {...register(`variants.${index}.variant_symbol` as const)}
                  id={`variants.${index}.variant_symbol`}
                  autoComplete="off"
                  className={classNames({
                    "border-red-600":
                      errors.variants && errors.variants[index]?.variant_symbol,
                    "": true,
                  })}
                />
                {errors.variants && (
                  <p className="text-red-600 text-sm text-center">
                    <>{errors.variants[index]?.variant_symbol?.message}</>
                  </p>
                )}
              </div>
            </div>
            <div className="flex">
              <Label
                htmlFor={`variants.${index}.variant_price`}
                className="text-right"
              >
                Price
              </Label>
              <div>
                <Input
                  {...register(`variants.${index}.variant_price` as const)}
                  type="number"
                  id={`variants.${index}.variant_price`}
                  autoComplete="off"
                  className={classNames({
                    "border-red-600":
                      errors.variants && errors.variants[index]?.variant_price,
                    "": true,
                  })}
                />
                {errors.variants && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.variants[index]?.variant_price?.message}</>
                  </p>
                )}
              </div>
            </div>
            <div className="flex ">
              <Label
                htmlFor={`variants.${index}.variant_stocks`}
                className="text-right"
              >
                Stocks
              </Label>
              <div>
                <Input
                  {...register(`variants.${index}.variant_stocks` as const)}
                  type="number"
                  id={`variants.${index}.variant_stocks`}
                  autoComplete="off"
                  className={classNames({
                    "border-red-600":
                      errors.variants && errors.variants[index]?.variant_stocks,
                    "": true,
                  })}
                />
                {errors.variants && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.variants[index]?.variant_stocks?.message}</>
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="destructive"
              size="lg"
              onClick={() => handleRemoveForm(index, field)}
            >
              DELETE
            </Button>
          </div>
        ))}
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
      <Dialog>
        <DialogTrigger
          className="h-fit absolute right-5 bottom-5 w-[14%] flex space-x-3 bg-green-600"
          ref={buttonRef}
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
            {isSubmitting ? "Updating Variant" : "Update Variant"}
          </p>
        </DialogTrigger>
        <DialogContent>
          <Permission roles={moderate} handlePermission={handlePermission} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateVariant;
