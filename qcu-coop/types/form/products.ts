export type ProductFormValues = {
  product_name?: string;
  display_name: string;
  display_price: string;
  product_stocks: string;
  product_description: string;
  product_sold?: string;
  status: string;
  isFeatured: string;
  isDeleted?: string;
  display_image: any;
  category_id: string;
  variants: {
    variant_name: string;
    variant_symbol: string;
    variant_price: string;
    variant_stocks: string;
  }[];
};


