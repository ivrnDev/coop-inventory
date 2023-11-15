import RenderAnalytics from "@/components/admin/analytics/render/Analytics";
import { getSalesAnalytics } from "@/lib/api/analytics";
import { ProductSales, SalesAnalytics } from "@/types/analytics/analytics";

const Analytics = async () => {
  const sales: SalesAnalytics = await getSalesAnalytics();

  return (
    <>
      <section className="min-h-admin-main px-5 pt-2">
          <RenderAnalytics analytics={sales} />
      </section>
    </>
  );
};

export default Analytics;
