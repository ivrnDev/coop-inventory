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
      <section className="min-h-admin-main p-7">
        <div id="all-time-container" className="w-full flex gap-5">
          <div className="w-full mb-4">
            <Card className="relative h-48 shadow-sm shadow-white p-3 rounded-2xl bg-gradient-to-br from-black via-slate-800 to-slate-900 flex flex-col justify-center">
              <h1 className="font-bold text-2xl ml-3 text-white absolute top-4 left-3">
                ALL TIME SALES
              </h1>
              <LineChart
                color="white"
                size={35}
                className="absolute right-8 top-5"
              />
              <CardContent className="mx-auto flex items-center space-x-20 mt-16">
                <div>
                  <p className="text-4xl text-white font-bold text-center">
                    {sold?.all?.value.toLocaleString() ?? 0}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full mb-4">
            <Card className="relative h-48 shadow-sm shadow-white p-3 rounded-2xl bg-gradient-to-br from-black via-slate-800 to-slate-900 flex flex-col justify-center">
              <h1 className="font-bold text-2xl ml-3 text-white absolute top-4 left-3">
                ALL TIME REVENUE
              </h1>
              <TrendingUp
                color="white"
                size={35}
                className="absolute right-8 top-5"
              />
              <CardContent className="mx-auto flex items-center space-x-20 mt-14">
                <div>
                  <p className="text-4xl text-white font-bold text-center">
                    ₱{" "}
                    {revenue?.all?.value.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) ?? 0.0}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div
          id="today-yesterday-container"
          className="grid grid-cols-2 gap-5 mb-4 w-full"
        >
          <Card className="relative h-fit shadow-sm p-3 rounded-lg">
            <h1 className="font-bold text-2xl ml-3 absolute top-4 left-3">
              SALES
            </h1>
            <CardContent className="w-full h-full flex items-center justify-around pt-4 mt-10">
              <div className="text-center h-fit">
                <h2 className="text-3xl text-black font-bold">
                  {sold?.day?.today?.value ?? 0}
                </h2>
                <p className=" text-slate-700 font-bold capitalize text-2xl mt-2">
                  Today
                </p>
              </div>
              <div className="text-center h-fit">
                <h2 className="text-3xl text-black font-bold">
                  {sold?.day?.previous?.value ?? 0}
                </h2>
                <p className=" text-slate-700 font-bold capitalize text-2xl mt-2">
                  Yesterday
                </p>
              </div>
            </CardContent>
            <Activity
              color="black"
              size={35}
              className="absolute right-6 bottom-1/2 translate-y-[50%]"
            />
          </Card>
          <Card className="relative h-fit shadow-sm p-3 rounded-lg">
            <h1 className="font-bold text-2xl ml-3 absolute top-4 left-3">
              REVENUES
            </h1>
            <CardContent className="w-full h-full flex items-center justify-around pt-4 mt-10">
              <div className="text-center h-fit">
                <h2 className="text-3xl text-black font-bold">
                  ₱{" "}
                  {revenue?.day?.today?.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) ?? 0}
                </h2>
                <p className="text-slate-700 font-bold capitalize text-2xl mt-2">
                  Today
                </p>
              </div>
              <div className="text-center h-fit">
                <h2 className="text-3xl text-black font-bold">
                  ₱{" "}
                  {revenue?.day?.previous?.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) ?? 0}
                </h2>
                <p className=" text-slate-700 font-bold capitalize text-2xl mt-2">
                  Yesterday
                </p>
              </div>
            </CardContent>
            <ShoppingBag
              color="black"
              size={35}
              className="absolute right-6 bottom-1/2 translate-y-[50%]"
            />
          </Card>
        </div>

        <div id="card-container" className="grid grid-cols-4 gap-5 mb-4">
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                {sold?.month?.currentMonth?.value ?? 0}
              </h2>
              <h4 className=" text-slate-700 font-bold capitalize">
                Current Month
              </h4>
            </CardContent>
          </Card>
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                {sold?.month?.previousMonth?.value ?? 0}
              </h2>
              <h4 className=" text-slate-700 font-bold capitalize">
                Previous Month
              </h4>
            </CardContent>
          </Card>
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                {sold?.year?.currentYear?.value ?? 0}
              </h2>
              <h4 className=" text-slate-700 font-bold capitalize">
                Current Year
              </h4>
            </CardContent>
          </Card>
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                {sold?.year?.previousYear?.value ?? 0}
              </h2>
              <h4 className=" text-slate-700 font-bold capitalize">
                Previous Year
              </h4>
            </CardContent>
          </Card>

          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                ₱{" "}
                {revenue?.month?.currentMonth?.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) ?? 0}
              </h2>
              <h4 className=" text-slate-700 font-bold capitalize">
                Current Month
              </h4>
            </CardContent>
          </Card>
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                ₱{" "}
                {revenue?.month?.previousMonth?.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) ?? 0}
              </h2>
              <h4 className=" text-slate-700 font-bold capitalize">
                Previous Month
              </h4>
            </CardContent>
          </Card>
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                ₱{" "}
                {revenue?.year?.currentYear?.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) ?? 0}
              </h2>
              <h4 className=" text-slate-700 font-bold capitalize">
                Current Year
              </h4>
            </CardContent>
          </Card>
          <Card className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                ₱{" "}
                {revenue?.year?.previousYear?.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) ?? 0}
              </h2>
              <h4 className=" text-slate-700 font-bold capitalize">
                Previous Year
              </h4>
            </CardContent>
          </Card>
        </div>

        <div
          id="second-section-container"
          className="w-full grid grid-cols-2 overflow-hidden"
        >
          <div id="product-analytics-container" className="w-[80%]">
            <ProductAnalytics products={product} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Analytics;
