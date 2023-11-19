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
    year: {
      currentYear: SalesValue;
      previousYear: SalesValue;
    };
    day: {
      today: SalesValue;
      yesterday: SalesValue;
    };
    month: {
      currentMonth: SalesValue;
      previousMonth: SalesValue;
    };
    all: SalesValue;
  };
  revenue: {
    year: {
      currentYear: SalesValue;
      previousYear: SalesValue;
    };
    day: {
      today: SalesValue;
      yesterday: SalesValue;
    };
    month: {
      currentMonth: SalesValue;
      previousMonth: SalesValue;
    };
    all: SalesValue;
  };
};
