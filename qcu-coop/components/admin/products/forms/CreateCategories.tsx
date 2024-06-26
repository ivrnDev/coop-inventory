"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "@/lib/api/categories";
import { createActivity } from "@/lib/api/activity";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import classNames from "classnames";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/middleware/zod/categories";
import { rolePermissions } from "@/lib/permission";
import { useEffect, useState } from "react";
import Permission from "../../Permission";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";

const CreateCategoriesForm = () => {
  const { toast } = useToast();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { moderate } = rolePermissions;
  type ValidationCategorySchema = z.infer<typeof CategorySchema>;
  const [isAllowed, setIsAllowed] = useState(false);
  const [adminId, setadminId] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ValidationCategorySchema>({
    resolver: zodResolver(CategorySchema),
  });

  useEffect(() => {
    if (isAllowed) {
      handleSubmit(onSubmit)();
      setIsAllowed(false);
    }
  }, [isAllowed]);

  const handlePermission = async (permission: boolean, id?: number) => {
    if (permission) {
      setIsAllowed(true);
      id && setadminId(id);
    }
    !isAllowed && buttonRef.current && buttonRef.current.click();
  };

  const onSubmit = async (data: ValidationCategorySchema) => {
    const { category_name } = data;

    if (isAllowed) {
      const form = new FormData();
      for (const key of Object.keys(data) as (keyof typeof data)[]) {
        form.append(key, data[key]);
      }

      try {
        const newCategory = await createCategory(form);

        if (newCategory.status === 201) {
          await createActivity(
            { action: "created", target: "category", object: category_name },
            adminId
          );
          toast({
            title: "Success",
            description: "You have successfully created a category!",
          });
        } else if (newCategory.status === 400) {
          toast({
            variant: "destructive",
            title: "Failed to Create Category.",
            description: `Category ${category_name} already exist.`,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Internal Server Error.",
          description: `Something went wrong.`,
        });
      }
    }
    return;
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Create Category</Button>
        </DialogTrigger>
        <DialogContent className="w-48">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>CREATE CATEGORY</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-1 mt-5">
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
                <p className="text-red-600 text-sm mt-2 text-center">
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
              <p className="text-red-600 text-sm mt-2 text-center">
                <>{errors.category_image?.message}</>
              </p>
            )}
            <DialogFooter className="mt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="submit" ref={buttonRef}>
                    {isSubmitting ? "Submitting" : "Submit"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <Permission
                    roles={moderate}
                    handlePermission={handlePermission}
                  />
                </DialogContent>
              </Dialog>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateCategoriesForm;
