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
import {
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "@/lib/api/categories";
import { createActivity } from "@/lib/api/activity";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import classNames from "classnames";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateCategorySchema } from "@/middleware/zod/categories";
import { rolePermissions } from "@/lib/permission";
import { useEffect, useState } from "react";
import Permission from "../../Permission";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categories } from "@/types/products/products";
import DeleteButton from "../buttons/Delete";

const UpdateCategoriesForm = () => {
  const { toast } = useToast();
  const { unrestricted, moderate, restricted } = rolePermissions;
  type ValidationCategorySchema = z.infer<typeof UpdateCategorySchema>;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [adminId, setadminId] = useState(0);
  const [categories, setCategories] = useState<Categories[]>();
    const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ValidationCategorySchema>({
    resolver: zodResolver(UpdateCategorySchema),
  });

  const handlePermission = async (permission: boolean, id?: number) => {
    if (permission) {
      setIsAllowed(true);
      id && setadminId(id);
    }
    !isAllowed && buttonRef.current && buttonRef.current.click();
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const result = await getAllCategories();
        if (result) {
          setCategories(result);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, [handlePermission]);

  const onSubmit = async (data: ValidationCategorySchema) => {
    const { category_name, category_id } = data;
        if (isAllowed) {
      const form = new FormData();
      for (const key of Object.keys(data) as (keyof typeof data)[]) {
        form.append(key, data[key]);
      }
      try {
        const getCategory = await getCategoryById(category_id);
        const existingCategoryName = getCategory[0].category_name;

        const newCategory = await updateCategory(form, category_id);
        if (newCategory.status === 201) {
          await createActivity(
            {
              action: "updated",
              target: "category",
              object: existingCategoryName,
              change: category_name,
            },
            adminId
          );
          toast({
            description: "You have successfully updated a category.",
          });
        } else if (newCategory.status === 400) {
          toast({
            variant: "destructive",
            title: "Failed to Update Category.",
            description: `Category ${category_name} already exist.`,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    return;
  };

  useEffect(() => {
    if (isAllowed) {
      handleSubmit(onSubmit)();
      setIsAllowed(false);
    }
  }, [isAllowed]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Update Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update Category</DialogTitle>
            </DialogHeader>
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={classNames({
                      "border-red-600": errors.category_id,
                      "w-[180px]": true,
                    })}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories &&
                        categories.map((category, index) => (
                          <SelectItem
                            key={index}
                            value={`${category.category_id}`}
                          >
                            {category.category_name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category_id && (
              <p className="text-red-600 text-sm mt-2">
                <>{errors.category_id?.message}</>
              </p>
            )}
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
                <DialogTrigger ref={buttonRef}>
                 {isSubmitting ? "Updating" : "Update"}
                </DialogTrigger>
                <DialogContent>
                  <Permission
                    roles={unrestricted}
                    handlePermission={handlePermission}
                  />
                </DialogContent>
              </Dialog>
              <DeleteButton categoryId={getValues().category_id} />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCategoriesForm;
