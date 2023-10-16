import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProductImage } from "@/lib/api/products";
import { Label } from "@radix-ui/react-label";
import { Controller, useForm } from "react-hook-form";

type Props = {
  productId: string;
};
const UpdateImageModal = ({ productId }: Props) => {
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data: any) => {
    const form = new FormData();
    form.append("display_image", data.display_image);

    try {
      const response = await updateProductImage(form, productId);
      if (response.status === 200) {
        console.log("Product image updated successfully");
      } else {
        console.error("Failed to update Product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                />
              </>
            )}
          />
        </div>
        <Button type="submit">UPDATE</Button>
      </form>
    </>
  );
};

export default UpdateImageModal;
