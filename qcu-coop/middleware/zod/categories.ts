import { z } from "zod";

export const CategorySchema = z.object({
  category_name: z
    .string()
    .toLowerCase()
    .trim()
    .max(20, { message: "Category cannot exceed 20 characters" })
    .refine((value) => value.length > 0, {
      message: "Category name is required",
    })
    .refine((value) => value.length >= 3, {
      message: "Category must be at least 3 characters",
    }),
  category_image: z
    .any()
    .refine((value) => !!value, {
      message: "Category image is required",
    })
    .refine(
      (file) => {
        if (!file) {
          return false;
        }
        const allowedFileTypes = ["image/jpeg", "image/png"];
        return allowedFileTypes.includes(file.type);
      },
      {
        message: "Invalid file type. Only JPEG and PNG images are allowed.",
      }
    ),
});

export const UpdateCategorySchema = z.object({
  category_id: z.any().refine((value) => value > 0, {
    message: "Please select category first!",
  }),
  category_name: z
    .string()
    .toLowerCase()
    .trim()
    .max(20, { message: "Category cannot exceed 20 characters" })
    .refine((value) => value.length > 0, {
      message: "Category name is required",
    })
    .refine((value) => value.length >= 3, {
      message: "Category must be at least 3 characters",
    }),
  category_image: z
    .any()
    .refine((value) => !!value, {
      message: "Category image is required",
    })
    .refine(
      (file) => {
        if (!file) {
          return false;
        }
        const allowedFileTypes = ["image/jpeg", "image/png"];
        return allowedFileTypes.includes(file.type);
      },
      {
        message: "Invalid file type. Only JPEG and PNG images are allowed.",
      }
    ),
});
