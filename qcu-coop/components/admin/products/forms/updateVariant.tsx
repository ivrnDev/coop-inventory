import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import classNames from "classnames";

import Permission from "../../Permission";
import { rolePermissions } from "@/lib/permission";
import { ValidateVariant, VariantSchema } from "@/middleware/zod/variant";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getVariantByProductId, updateVariant } from "@/lib/api/variants";
import { createActivity } from "@/lib/api/activity";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  productId: string;
  productName: string;
};

const UpdateVariant = ({ productId, productName }: Props) => {
  const { toast } = useToast();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { moderate } = rolePermissions;
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<number>(0);
  const [maxStocks, setMaxStocks] = useState<number>(125);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ValidateVariant>({
    resolver: zodResolver(VariantSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });

  useEffect(() => {
    const getProduct = async () => {
      const item = await getVariantByProductId(productId);
      if (item && item.length > 0) {
        const defaultFormValues: ValidateVariant = {
          variants:
            item &&
            item.map((variant: any) => ({
              variant_id: variant.variant_id || 0,
              variant_name: variant.variant_name || "",
              variant_symbol: variant.variant_symbol || "",
              variant_price: String(variant.variant_price) || "0",
              variant_stocks: Number(variant.variant_stocks) || 0,
            })),
        };
        reset(defaultFormValues);
      }
    };
    getProduct();
  }, []);

  const handleRemoveForm = async (index: number) => {
    if (fields.length < 2) {
      return toast({
        variant: "destructive",
        title: "Failed to remove variant.",
        description: "There must be atleast 1 variant.",
      });
    }
    remove(index);
  };

  const handlePermission = async (permission: boolean, id?: number) => {
    if (permission) {
      setIsAllowed(true);
      id && setAdminId(id);
    }
    !isAllowed && buttonRef.current && buttonRef.current.click();
  };

  const onSubmit = async (data: ValidateVariant) => {
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
        className="grid grid-cols-2 bg-[#37B3E2] overflow-auto border-black border rounded-md"
      >
        {fields.map((field, index) => (
          <div key={field.id} className="p-2 flex flex-col space-y-3">
            <div className="flex items-center space-x-5">
              <Label htmlFor={`variants.${index}.variant_name`}>Name</Label>
              <div className="w-full">
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
            <div className="flex items-center space-x-5">
              <Label htmlFor={`variants.${index}.variant_symbol`}>Symbol</Label>
              <div className="w-full">
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
            <div className="flex items-center space-x-5">
              <Label htmlFor={`variants.${index}.variant_price`}>Price</Label>
              <div className="w-full">
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
            <div className="flex items-center space-x-5 ">
              <Label htmlFor={`variants.${index}.variant_stocks`}>Stocks</Label>
              <div className="w-full">
                <Input
                  {...register(`variants.${index}.variant_stocks` as const, {
                    valueAsNumber: true,
                  })}
                  type="number"
                  max={maxStocks}
                  min={0}
                  id={`variants.${index}.variant_stocks`}
                  autoComplete="off"
                  className={classNames({
                    "border-red-600 bg-white":
                      errors.variants && errors.variants[index]?.variant_stocks,
                    "": true,
                    "bg-[#52B788]":
                      watch(`variants.${index}.variant_stocks`) <= maxStocks,
                    "bg-[#BCE784]":
                      watch(`variants.${index}.variant_stocks`) <
                      0.8 * maxStocks,
                    "bg-[#EAB61A]":
                      watch(`variants.${index}.variant_stocks`) <
                      0.64 * maxStocks,
                    "bg-[#ff831d]":
                      watch(`variants.${index}.variant_stocks`) <
                      0.4 * maxStocks,
                    "bg-[#DE1919]":
                      watch(`variants.${index}.variant_stocks`) <=
                      0.2 * maxStocks,
                    "bg-black text-white":
                      watch(`variants.${index}.variant_stocks`) == 0,
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
              onClick={() => handleRemoveForm(index)}
            >
              REMOVE
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
            variant_stocks: 0,
          })
        }
        className="absolute right-10 top-2"
      >
        Add Variant
      </Button>

      <Dialog>
        <DialogTrigger
          asChild
          className="h-fit absolute right-5 bottom-5 w-[14%] flex space-x-3"
        >
          <Button
            variant="submit"
            ref={buttonRef}
            className="flex space-x-2 w-fit"
          >
            <div className="relative w-5 h-5">
              <Image
                src="/icons/add-sign-icon.svg"
                alt="add-sign"
                sizes="min-w-1"
                fill
              />
            </div>
            <p className="text-base font-semibold">
              {isSubmitting ? "Updating Variants" : "Update Variants"}
            </p>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Permission roles={moderate} handlePermission={handlePermission} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateVariant;
