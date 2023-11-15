export type OrderAnalytics = {
  total_orders: number;
  new_orders: number;
  pending_orders: number;
  completed_orders: number;
};

export type ProductSales = {
  product_id: number;
  product_name: string;
  sold: number;
  revenue: number;
};

type SalesValue = {
  name: string;
  value: number;
};
export type SalesAnalytics = {
  sold: {
    year: SalesValue[];
    month: SalesValue[];
    date: SalesValue[];
    all: SalesValue[];
  };
  revenue: {
    year: SalesValue[];
    month: SalesValue[];
    date: SalesValue[];
    all: SalesValue[];
  };
};
