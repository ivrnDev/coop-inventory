"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activities } from "@/types/activities/activities";
import { format } from "date-fns";
import { CheckCircle2, Search } from "lucide-react";
import { useState } from "react";

type Props = {
  activities: Activities[];
};

const FilteredActivities = ({ activities }: Props) => {
  const [filter, setFilter] = useState<string>("");

  const filteredActivities = activities.filter(
    (activity) =>
      activity.message.toLowerCase().includes(filter.toLowerCase()) ||
      format(new Date(activity.date), "PP")
        .toLowerCase()
        .includes(filter.toLowerCase()) ||
      format(new Date(activity.date), "pp")
        .toLowerCase()
        .includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="w-1/2 h-8 relative">
        <Search className="absolute top-[50%] left-2 translate-y-[-50%]" size="20"/>
        <Input type="search" placeholder="Search" onChange={(e) => setFilter(e.target.value)} className="w-full h-full pl-8" />
      </div>
      <Table>
        {filteredActivities.length > 0 && (
          <TableHeader>
            <TableRow>
              <TableHead>Activities</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
        )}

        <TableBody>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <TableRow key={index} className="text-white">
                <TableCell className="flex gap-3">
                  <CheckCircle2 color="blue" />
                  {activity.message}
                </TableCell>
                <TableCell>{format(new Date(activity.date), "PP")}</TableCell>
                <TableCell>{format(new Date(activity.date), "pp")}</TableCell>
              </TableRow>
            ))
          ) : (
            <p className="text-white font-bold text-xl text-center ">No Available Activities</p>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default FilteredActivities;
