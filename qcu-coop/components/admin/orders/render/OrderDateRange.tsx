"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import classNames from "classnames";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

type Props = {
  className?: string;
  onDateSelect?: (selectedDate: DateRange | undefined) => void;
};
const CalendarRangePicker = ({ onDateSelect, className }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <div className={classNames("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={classNames(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                onDateSelect?.(selectedDate);
                setDate(selectedDate);
              }
            }}
            numberOfMonths={2}
          />
          <Button
            size="icon"
            className="absolute top-0 right-0 font-bold w-5 h-5 rounded-none bg-transparent text-black hover:bg-slate-300"
            onClick={() => {
              onDateSelect?.(undefined);
              setDate(undefined);
            }}
          >
            x
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default CalendarRangePicker;
