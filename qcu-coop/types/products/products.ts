export type ProductsType = {
  category_id: number;
  product_id?: number;
  product_name: string;
  display_name: string;
  display_price: string;
  product_stocks: number;
  product_description: string;
  product_sold?: number;
  status: string;
  isFeatured?: number;
  isDeleted?: number;
  date_created?: string;
  display_image?: any;
  id?: any;
  variant_name?: string;
  variant_symbol?: string;
  variant_price?: number;
  variant_stocks?: number;
  category_name: string;
  category_image: any;
};

export type ItemType = {
  category_id: number;
  product_id?: number;
  product_name: string;
  display_name: string;
  product_stocks: number;
  product_description: string;
  product_sold: number;
  display_image?: any;
  id?: number;
  variant_id: number;
  variant_name?: string;
  variant_symbol?: string;
  variant_price?: number;
  variant_stocks?: number;
  category_name: string;
  category_image: any;
};

export type CategoriesType = {
  category_id?: number;
  category_name: string;
  category_image: any;
};
