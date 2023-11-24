import { z } from "zod";

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
