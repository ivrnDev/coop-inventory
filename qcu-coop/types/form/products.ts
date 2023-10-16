export type ProductFormValues = {
  product_name?: string;
  display_name: string;
  display_price: string;
  product_stocks: number;
  product_description: string;
  product_sold?: number;
  status: string;
  isFeatured: string;
  isDeleted?: number;
  display_image: any;
  category_id: string;
  variant_name: [string];
  variant_symbol: [string];
  variant_price: [number];
  variant_stocks: [number];
};
