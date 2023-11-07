import { z } from "zod";
export const CustomerSchema = z.object({
  student_id: z
    .string()
    .trim()
    .max(30, { message: "Student ID cannot exceed 30 characters" })
    .refine((value) => value.length > 0, {
      message: "Student is required",
    })
    .refine((value) => value.length >= 3, {
      message: "Name must be at least 5 characters",
    }),
  customer_name: z
    .string()
    .trim()
    .max(30, { message: "Name cannot exceed 30 characters" })
    .refine((value) => value.length > 0, {
      message: "Name is required",
    })
    .refine((value) => value.length >= 3, {
      message: "Name must be at least 3 characters",
    }),
  customer_phone: z
    .string()
    .trim()
    .max(30, { message: "Phone number cannot exceed 30 characters" })
    .refine((value) => value.length > 0, {
      message: "Phone number is required",
    })
    .refine((value) => value.length >= 3, {
      message: "Phone number must be at least 3 characters",
    }),
  customer_email: z
    .string()
    .trim()
    .max(30, { message: "Email cannot exceed 30 characters" })
    .refine((value) => value.length > 0, {
      message: "Email is required",
    })
    .refine((value) => value.length >= 3, {
      message: "Email must be at least 3 characters",
    }),
  payment_method: z
    .string()
    .trim()
    .refine((value) => value.length > 0, {
      message: "Payment method is required",
    }),
});

export type ValidateCustomer = z.infer<typeof CustomerSchema>;
