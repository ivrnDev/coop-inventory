import { z } from "zod";

export const AccountSchema = z.object({
  admin_name: z
    .string({ required_error: "Name is required" })
    .trim()
    .max(50, { message: "Name cannot exceed 50 characters" })
    .min(5, { message: "Name must be at least 5 characters" }),
  admin_username: z
    .string({ required_error: "Username is required" })
    .trim()
    .max(20, { message: "Username cannot exceed 20 characters" })
    .min(5, { message: "Username must be at least 5 characters" }),
  admin_password: z
    .string({ required_error: "Password is required" })
    .trim()
    .max(20, { message: "Password cannot exceed 20 characters" })
    .min(5, { message: "Password must be at least 5 characters" }),
  role: z
    .string()
    .trim()
    .max(255, { message: "product_description cannot exceed 255 characters" }),
  profile_picture: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) {
          return true;
        }
        const allowedFileTypes = ["image/jpeg", "image/png"];
        return allowedFileTypes.includes(file.type);
      },
      {
        message: "Invalid file type. Only JPEG and PNG images are allowed.",
      }
    ),
});

export type ValidateAccount = z.infer<typeof AccountSchema>;
