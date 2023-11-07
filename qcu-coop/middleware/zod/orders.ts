import { z } from "zod";
import { CustomerSchema } from "./customer";

export const OrderSchema = z.object({
  product_id: z.string(),
  variant_id: z.string(),
  quantity: z.string(),
});
export const Order = z.object({
  customer: z.array(CustomerSchema),
  orders: z.array(OrderSchema)
})
export type ValidateOrder = z.infer<typeof OrderSchema>;
export type ValidateOrders = z.infer<typeof Order>;