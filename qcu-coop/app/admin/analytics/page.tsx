import { getProductSales, getSalesAnalytics } from "@/lib/api/analytics";
import { ProductSales, SalesAnalytics } from "@/types/analytics/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, LineChart, ShoppingBag, TrendingUp } from "lucide-react";
import ProductAnalytics from "@/components/admin/analytics/render/ProductAnalytics";

const Analytics = async () => {
  const sales: SalesAnalytics = await getSalesAnalytics();
  const product: ProductSales[] = await getProductSales();
  const sold = sales?.sold;
  const revenue = sales?.revenue;
  return (
    <>
      <section className="min-h-admin-main px-5 pt-2">
        <div className="grid grid-cols-2 gap-5 mb-4">
          <Card className="relative h-44 shadow-sm p-4 rounded-lg bg-gradient-to-t from-slate-900 via-slate-700 to-slate-950">
            <CardContent className="grid grid-cols-2">
              <div className="text-center mt-5">
                <h2 className="text-4xl text-white font-bold mt-2">
                  {sold?.day?.today.value ?? 120}
                </h2>
                <h4 className="text-3xl text-gray-200 font-bold capitalize mt-6">
                  Today
                </h4>
              </div>
              <div className="text-center mt-5">
                <h2 className="text-4xl text-white font-bold mt-2">
                  {sold?.day?.yesterday.value ?? 490}
                </h2>
                <h4 className="text-3xl text-gray-200 font-bold capitalize mt-6">
                  Yesterday
                </h4>
              </div>
            </CardContent>
          </Card>
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col"></CardContent>
          </Card>
        </div>
        <div id="card-container" className="grid grid-cols-4 gap-5 mb-4">
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                {sold?.all?.value ?? 0}
              </h2>
              <h4 className="text-md text-slate-700 font-bold capitalize">
                sales
              </h4>
            </CardContent>
            <Activity
              color="black"
              size={35}
              className="absolute right-6 bottom-1/2 translate-y-[50%]"
            />
          </Card>
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                ₱ {revenue?.all?.value ?? 0}
              </h2>
              <h4 className="text-md text-slate-700 font-bold capitalize">
                Revenue
              </h4>
            </CardContent>
            <ShoppingBag
              color="black"
              size={35}
              className="absolute right-6 bottom-1/2 translate-y-[50%]"
            />
          </Card>
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                {sold?.day?.yesterday.value ?? 0}
              </h2>
              <h4 className="text-md text-slate-700 font-bold capitalize">
                Yesterday
              </h4>
            </CardContent>
          </Card>
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                {sold?.year?.currentYear.value ?? 0}
              </h2>
              <h4 className="text-md text-slate-700 font-bold capitalize">
                Current Year
              </h4>
            </CardContent>
          </Card>
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                {sold?.year?.previousYear.value ?? 0}
              </h2>
              <h4 className="text-md text-slate-700 font-bold capitalize">
                Previous Year
              </h4>
            </CardContent>
          </Card>
        </div>
        <div
          id="second-section-container"
          className="w-full grid grid-cols-2 overflow-hidden"
        >
          <div id="year-month-sales" className="w-[90%] h-full">
            <div className="w-full h-[50%] mb-4">
              <Card className="relative h-fit  shadow-sm shadow-white p-3 rounded-2xl bg-gradient-to-br from-black via-slate-800 to-slate-900 flex flex-col justify-center">
                <h1 className="font-bold text-2xl ml-3 text-white absolute top-4 left-3">
                  SALES
                </h1>
                <LineChart
                  color="white"
                  size={35}
                  className="absolute right-8 top-5"
                />
                <CardContent className="mx-auto flex items-center space-x-20 mt-16">
                  <div>
                    <p className="text-4xl text-white font-bold text-center">
                      {sold?.month?.currentMonth.value ?? 0}
                    </p>
                    <p className="text-md text-muted font-bold capitalize mt-2">
                      Current Month
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl text-white font-bold text-center">
                      {sold?.month?.previousMonth.value ?? 0}
                    </p>
                    <p className="text-md text-muted font-bold capitalize mt-2">
                      Previous Month
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-full mb-4">
              <Card className="relative h-fit shadow-sm shadow-white p-3 rounded-2xl bg-gradient-to-br from-black via-slate-800 to-slate-900 flex flex-col justify-center">
                <h1 className="font-bold text-2xl ml-3 text-white absolute top-4 left-3">
                  REVENUES
                </h1>
                <TrendingUp
                  color="white"
                  size={35}
                  className="absolute right-8 top-5"
                />
                <CardContent className="mx-auto flex items-center space-x-20 mt-14">
                  <div>
                    <p className="text-4xl text-white font-bold text-center">
                      ₱ {revenue?.month?.currentMonth.value ?? 0}
                    </p>
                    <p className="text-md text-muted font-bold capitalize mt-2">
                      Current Month
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl text-white font-bold text-center">
                      ₱ {revenue?.month?.previousMonth.value ?? 0}
                    </p>
                    <p className="text-md text-muted font-bold capitalize mt-2">
                      Previous Month
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div id="product-analytics-container" className="w-[80%] ml-12">
            <ProductAnalytics products={product} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Analytics;
