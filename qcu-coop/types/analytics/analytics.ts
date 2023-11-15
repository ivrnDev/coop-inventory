export type OrderAnalytics = {
  total_orders: number;
  new_orders: number;
  pending_orders: number;
  completed_orders: number;
}

export type ProductSales = {
  product_id: number;
  product_name: string;
  sold: number;
  revenue: number;
}
export type YearlySales = {
  sold: number;
  revenue: number;
  year: number
}
export type CurrentSalesPerMonth = {
  sold: number;
  revenue: number;
  year: number
}