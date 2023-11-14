import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllActivities } from "@/lib/api/activity";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Activities } from "@/types/activities/activities";
import FilteredActivities from "@/components/admin/dashboard/render/FilteredActivities";
import Image from "next/image";
import { OrderAnalytics } from "@/types/analytics/analytics";
import { getOrderAnalytics } from "@/lib/api/analytics";

const AdminDashboard = async () => {
  const activities: Activities[] = await getAllActivities();
  const orderCount: OrderAnalytics[] = await getOrderAnalytics();
  const { new_orders, pending_orders, completed_orders } = orderCount[0];
  return (
    <>
      <section className="flex-col md:flex h-admin-main overflow-hidden">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div
            id="orders-container"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <Card className="bg-gradient-to-r from-[#CB0000] to-[#0000FE] relative overflow-hidden text-white h-36">
              <Image
                src="/icons/dashboard/new-order.svg"
                alt="new-order-icon"
                width={100}
                height={100}
                className="absolute top-5 left-[22%]"
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">New Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold float-right">
                  {new_orders}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-[#9B6601] to-[#F8F902] relative overflow-hidden text-white">
              <Image
                src="/icons/dashboard/pending-order.svg"
                alt="new-order-icon"
                width={100}
                height={100}
                className="absolute top-5 left-[22%]"
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Pending Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold float-right">
                  {pending_orders}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-[#0000FE] to-[#37B3E2] relative overflow-hidden text-white">
              <Image
                src="/icons/dashboard/completed-order.svg"
                alt="new-order-icon"
                width={170}
                height={170}
                className="absolute -top-5 left-[22%]"
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Completed Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold float-right">
                  {completed_orders}
                </div>
              </CardContent>
            </Card>
          </div>
          <div
            id="recent-activity-container"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
          >
            <Card className="col-span-3 h-72 bg-[#101536]">
              <div className="flex justify-between p-4">
                <h1 className="text-lg font-semibold text-white">
                  Recent Activity
                </h1>
                <Dialog>
                  <DialogTrigger>
                    <h2 className="text-md text-[#3751FF]">View all</h2>
                  </DialogTrigger>
                  <DialogContent className="bg-[#101536] h-4/5 flex flex-col">
                    <FilteredActivities activities={activities} />
                  </DialogContent>
                </Dialog>
              </div>
              <CardContent className="overflow-y-auto h-[inherit]">
                <Table>
                  <TableBody>
                    {activities.length > 0 ? (
                      activities.map((activity, index) => (
                        <TableRow key={index}>
                          <TableCell className="flex gap-3">
                            <CheckCircle2 color="blue" />
                            <p className="text-white">{activity.message}</p>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                        <p className="text-white text-lg text-center">No Available Activities</p>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
