import { z } from "zod";
const VariantSchema = z.object({
  variant_name: z
    .string()
    .toLowerCase()
    .max(20, { message: "Variant name cannot exceed 20 characters" })
    .refine((value) => value.length > 0, {
      message: "Variant name is required",
    })
    .refine((value) => value.length >= 3, {
      message: "Variant name must be at least 3 characters",
    }),
  variant_symbol: z
    .string()
    .toLowerCase()
    .max(15, { message: "Variant symbol cannot exceed 15 characters" })
    .refine((value) => value.length > 0, {
      message: "Variant symbol is required",
    }),
  variant_price: z
    .string()
    .max(6, { message: "Variant price cannot exceed 6 digits" })
    .refine((value) => value.length >= 0, {
      message: "Variant price is required",
    }),
  variant_stocks: z
    .string()
    .max(6, { message: "Variant stocks cannot exceed 6 digits" })
    .refine((value) => value.length >= 0, {
      message: "Variant stocks is required",
    }),
});
export const UpdateProductSchema = z.object({
  product_name: z
    .string()
    .trim()
    .toLowerCase()
    .max(20, { message: "Product name cannot exceed 20 characters" })
    .refine((value) => value.length > 0, {
      message: "Product name is required",
    })
    .refine((value) => value.length >= 3, {
      message: "Product name must be at least 3 characters",
    }),
  display_name: z
    .string()
    .trim()
    .toLowerCase()
    .max(20, { message: "Display name cannot exceed 20 characters" })
    .refine((value) => value.length > 0, {
      message: "Display name is required",
    })
    .refine((value) => value.length >= 3, {
      message: "Display name must be at least 3 characters",
    }),
  display_price: z
    .string()
    .trim()
    .toLowerCase()
    .max(20, { message: "Display price cannot exceed 20 characters" })
    .refine((value) => value.length > 0, {
      message: "Display price is required",
    })
    .refine((value) => value.length >= 3, {
      message: "Display price must be at least 3 characters",
    }),
  product_stocks: z
    .string()
    .trim()
    .toLowerCase()
    .max(6, { message: "Product stocks cannot exceed 6 digits" })
    .refine((value) => value.length >= 0, {
      message: "Product stocks is required",
    }),
  product_description: z
    .string()
    .trim()
    .toLowerCase()
    .max(255, { message: "product_description cannot exceed 255 characters" }),
  status: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => value.length > 0, {
      message: "Status is required",
    }),
  isFeatured: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => value.length > 0, {
      message: "Featured is required",
    }),
  category_id: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => value.length > 0, {
      message: "Category is required",
    }),
  display_image: z
    .any()
    .refine((value) => !!value, {
      message: "Category image is required",
      path: ["category_image"],
    })
    .refine(
      (file) => {
        const allowedFileTypes = ["image/jpeg", "image/png"];
        return allowedFileTypes.includes(file.type);
      },
      {
        message: "Invalid file type. Only JPEG and PNG images are allowed.",
        path: ["category_image"],
      }
    ),
  variants: z.array(VariantSchema),
});
