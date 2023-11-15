import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSales, SalesAnalytics } from "@/types/analytics/analytics";
import { Activity, LineChart, ShoppingBag, TrendingUp } from "lucide-react";
import ProductAnalytics from "./ProductAnalytics";
import { getProductSales } from "@/lib/api/analytics";

type Props = {
  analytics: SalesAnalytics;
};

const RenderAnalytics = async ({ analytics }: Props) => {
  const product: ProductSales[] = await getProductSales();
  const { sold, revenue } = analytics;

  return (
    <>
      <div id="card-container" className="grid grid-cols-4 gap-5 mb-4">
        {sold?.all.map((data, index) => (
          <Card key={index} className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                {data.value ?? 0}
              </h2>
              <h4 className="text-md text-slate-700 font-bold capitalize">
                {data.name}
              </h4>
            </CardContent>
            <Activity
              color="black"
              size={35}
              className="absolute right-6 bottom-1/2 translate-y-[50%]"
            />
          </Card>
        ))}
        {revenue?.all.map((data, index) => (
          <Card key={index} className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                ₱ {data.value.toLocaleString() ?? 0}
              </h2>
              <h4 className="text-md text-slate-700 font-bold capitalize">
                {data.name}
              </h4>
            </CardContent>
            <ShoppingBag
              color="black"
              size={35}
              className="absolute right-6 bottom-1/2 translate-y-[50%]"
            />
          </Card>
        ))}
        {sold?.day.map((data, index) => (
          <Card key={index} className="relative h-28 shadow-sm p-3 rounded-lg">
            <CardContent className="flex space-y-1 flex-col">
              <h2 className="text-2xl text-black font-bold">
                {data.value.toLocaleString() ?? 0}
              </h2>
              <h4 className="text-md text-slate-700 font-bold capitalize">
                {data.name}
              </h4>
            </CardContent>
          </Card>
        ))}
      </div>
      <div
        id="second-section-container"
        className="w-full grid grid-cols-2 overflow-hidden"
      >
        <div id="year-month-sales" className="w-[90%] h-full">
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
                {revenue?.month.map((data, index) => (
                  <div key={index}>
                    <p className="text-4xl text-white font-bold text-center">
                      ₱ {data.value.toLocaleString() ?? 0}
                    </p>
                    <p className="text-md text-muted font-bold capitalize mt-2">
                      {data.name}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
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
                {sold?.month.map((data, index) => (
                  <div key={index}>
                    <p className="text-4xl text-white font-bold text-center">
                      {data.value.toLocaleString() ?? 0}
                    </p>
                    <p className="text-md text-muted font-bold capitalize mt-2">
                      {data.name}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        <div id="product-analytics-container" className="w-[80%] ml-12">
          <ProductAnalytics products={product} />
        </div>
      </div>
    </>
  );
};

export default RenderAnalytics;
