import { z } from "zod";
import { CustomerSchemaFunction } from "./customer";
const CustomerSchema = CustomerSchemaFunction(true);

export const OrderSchema = z.object({
  product_id: z.string(),
  variant_id: z.string(),
  quantity: z.string(),
});
export const Order = z.object({
  customer: CustomerSchema,
  orders: z.array(OrderSchema),
});
export type ValidateOrder = z.infer<typeof OrderSchema>;
export type ValidateOrderData = z.infer<typeof Order>;
