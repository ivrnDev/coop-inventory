import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesAnalytics } from "@/types/analytics/analytics";

type Props = {
  analytics: SalesAnalytics;
};

const RenderAnalytics = ({ analytics }: Props) => {
  const { sold, revenue } = analytics;
  return (
    <>
     <div id="card-container" className="grid grid-cols-5 gap-5">
      {sold.all.map((data, index) => (
        <div key={index}>
          <Card className="relative overflow-hidden text-white h-36">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg text-black capitalize">
                {data.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl text-black font-bold float-right">
                {data.value}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
      </div>
    </>
  );
};

export default RenderAnalytics;
