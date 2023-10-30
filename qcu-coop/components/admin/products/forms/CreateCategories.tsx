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
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import classNames from "classnames";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/middleware/zod/categories";
import { rolePermissions } from "@/lib/permission";
import { useState } from "react";
import { adminPermission } from "@/lib/api/admin";
import { useRouter } from "next/navigation";
import Permission from "../../Permission";

const CreateCategoriesForm = () => {
  type ValidationCategorySchema = z.infer<typeof CategorySchema>;
  const [isAllowed, setIsAllowed] = useState(false);
  const { unrestricted, moderate, restricted } = rolePermissions;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ValidationCategorySchema>({
    resolver: zodResolver(CategorySchema),
  });

  const handlePermission = async (password: string) => {
    try {
      const response = await adminPermission(unrestricted, password);
      if (response.status === 200) {
        setIsAllowed(true);
      
        return true
      } else if (response.status === 403) {
        setIsAllowed(false);
        
        return false
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const onSubmit = async (data: ValidationCategorySchema) => {
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
              {...register("category_name")}
              id="category_name"
              placeholder="Category Name"
              autoComplete="off"
              className={classNames({
                "border-red-600": errors.category_name,
              })}
            />
            {errors.category_name && (
              <p className="text-red-600 text-sm mt-2">
                {errors.category_name?.message}
              </p>
            )}
          </div>
          <Controller
            name="category_image"
            control={control}
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
          {errors.category_image && (
            <p className="text-red-600 text-sm mt-2">
              <>{errors.category_image?.message}</>
            </p>
          )}

          <DialogFooter>
            <Dialog>
              <DialogTrigger>
                <Button type="submit" disabled={isSubmitSuccessful}>
                  {isSubmitting ? "Submitting" : "Submit"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <Permission handlePermission={handlePermission}/>
              </DialogContent>
            </Dialog>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoriesForm;
