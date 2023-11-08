import { z } from "zod";
export const CustomerSchemaFunction = (isCash: boolean) => {
  const CustomerSchema = z.object({
    student_id: z
      .string({ required_error: "Student ID is required" })
      .trim()
      .max(30, { message: "Student ID cannot exceed 30 characters" })
      .min(6, { message: "Student must be atleast 6 characters" }),
    customer_name: z
      .string({ required_error: "Name is required" })
      .trim()
      .max(30, { message: "Name cannot exceed 30 characters" })
      .min(3, { message: "Name must be atleast 3 characters" }),
    customer_phone: z
      .string({ required_error: "Phone is required" })
      .trim()
      .max(11, { message: "Phone number cannot exceed 11 characters" })
      .min(11, { message: "Phone must be atleast 11 characters" }),
    customer_email: z
      .string({ required_error: "Email is required" })
      .trim()
      .max(30, { message: "Email cannot exceed 30 characters" })
      .min(9, { message: "Email must be atleast 9 characters" }),
    payment_method: z.string({ required_error: "Payment is required" }),
    reference_number: isCash
      ? z.string().optional()
      : z
          .string({ required_error: "Reference number is required" })
          .min(9, { message: "Reference number must be atleast 10 characters long" }),

    pickup_date: z.string({ required_error: "Please pick a date" }),
  });
  return CustomerSchema;
};

// export type ValidateCustomer = z.infer<typeof CustomerSchemaFunction>;
