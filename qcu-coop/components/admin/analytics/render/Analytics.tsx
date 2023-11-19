import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSales, SalesAnalytics } from "@/types/analytics/analytics";
import { Activity, LineChart, ShoppingBag, TrendingUp } from "lucide-react";
import ProductAnalytics from "./ProductAnalytics";
import { getProductSales } from "@/lib/api/analytics";

type Props = {
  analytics: SalesAnalytics;
};

const RenderAnalytics = async ({ analytics }: Props) => {
 
  return (
    <>
     
     
    </>
  );
};

export default RenderAnalytics;
