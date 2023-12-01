import { z } from "zod";

export const Variants = z.object({
  variant_id: z.number().optional(),
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
    .number()
    .max(100, { message: "Variant stocks cannot exceed to 100" }),
});
export const VariantSchema = z.object({
  variants: z.array(Variants),
});

export type VariantsType = z.infer<typeof Variants>;
export type ValidateVariant = z.infer<typeof VariantSchema>;
