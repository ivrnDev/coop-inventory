"use client";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "@/lib/api/categories";
import { CategoriesFormType } from "@/types/form/categories";
import { Controller, useForm } from "react-hook-form";
const CreateCategoriesForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category_name: "",
      category_image: null,
    },
  });
  const onSubmit = async (data: CategoriesFormType) => {
    const form = new FormData();
    for (const key of Object.keys(data) as (keyof typeof data)[]) {
      form.append(key, data[key]);
    }
    try {
      const response = await createCategory(form);
      if (response.status === 201) {
        console.log("Category created successfully");
      } else {
        console.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>CREATE CATEGORY</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="category_name">Display Name</Label>
            <Input
              {...register("category_name", { required: true })}
              id="category_name"
              placeholder="Category Name"
              autoComplete="off"
            />
            {errors.category_name && <p className="text-red-600 text-sm mt-2">Category name is required*</p>}
          </div>
          <Controller
            name="category_image"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, ...field } }) => (
              <>
                <Label htmlFor="category_image">Category Image</Label>
                <Input
                  {...field}
                  onChange={(event) => {
                    const selectedFile = event.target.files?.[0];
                    if (selectedFile) {
                      onChange(selectedFile);
                    }
                  }}
                  type="file"
                  id="category_image"
                />
              </>
            )}
          />
          {errors.category_image && <p className="text-red-600 text-sm mt-2">Image is required*</p>}

          <DialogFooter>
            <button type="submit">Save changes</button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoriesForm;
