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

export const LoginSchema = z.object({
  admin_username: z
    .string()
    .trim()
    .max(20, { message: "Username cannot exceed 20 characters" })
    .min(1, { message: "Username is required" }),
  admin_password: z
    .string()
    .trim()
    .max(20, { message: "Password cannot exceed 20 characters" })
    .min(1, { message: "Password is required" }),
});

export type ValidateLoginForm = z.infer<typeof LoginSchema>;
