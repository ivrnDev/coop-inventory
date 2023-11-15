import RenderAnalytics from "@/components/admin/analytics/render/Analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSalesAnalytics } from "@/lib/api/analytics";
import { SalesAnalytics } from "@/types/analytics/analytics";

const Analytics = async () => {
  const sales: SalesAnalytics = await getSalesAnalytics();
  return (
    <>
      <section className="min-h-admin-main bg-green-500 p-5">
        <RenderAnalytics analytics={sales} />
      </section>
    </>
  );
};

export default Analytics;
