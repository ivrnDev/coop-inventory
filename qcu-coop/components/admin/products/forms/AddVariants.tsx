import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createVariant } from "@/lib/api/variants";
import { VariantFormValue } from "@/types/form/products";
import { useForm, Controller, useFieldArray } from "react-hook-form";

type Props = {
  productId: string;
};

const AddVariants = ({ productId }: Props) => {
  const { control, register, handleSubmit } = useForm<VariantFormValue>({
    defaultValues: {
      variants: [
        {
          variant_name: "",
          variant_symbol: "",
          variant_price: "0",
          variant_stocks: "0",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    rules: { minLength: 1 },
    name: "variants",
    control,
  });

  const submitForm = async (data: VariantFormValue) => {
    try {
      const response = await createVariant(data, productId);
      if (response.status === 201) {
        console.log("Variants created successfully");
      } else {
        console.error("Failed to create variants");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex space-x-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Variant</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(submitForm)}>
              <DialogHeader>
                <DialogTitle>ADD VARIANT</DialogTitle>
              </DialogHeader>
              <div className="grid grid-rows-2 max-h-[300px] bg-red-800">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid gap-3 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label
                        htmlFor={`variants.${index}.variant_name`}
                        className="text-right"
                      >
                        Name
                      </label>
                      <input
                        {...register(`variants.${index}.variant_name` as const)}
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
                        type="number"
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
                        type="number"
                        id={`variants.${index}.variant_stocks`}
                        className="col-span-3"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter className="">
                <Button
                  type="submit"
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

                <Button type="submit">UPDATE</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddVariants;
