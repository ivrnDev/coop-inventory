"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

import classNames from "classnames";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "@/lib/api/orders";
import { ValidateCustomer, CustomerSchema } from "@/middleware/zod/customer";
import { ValidateOrder } from "@/middleware/zod/orders";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type Props = {
  orders: ValidateOrder[];
  children: React.ReactNode;
};

const CreateOrderForm = ({ orders, children }: Props) => {
  const currentDate = new Date();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    resetField,
    control,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ValidateCustomer>({
    resolver: zodResolver(CustomerSchema),
  });

  useEffect(() => {
    resetField("payment_method", { defaultValue: "cash" });
  }, []);

  const onSubmit = (data: ValidateCustomer) => {};

  return (
    <>
      <section
        id="personal-info-container"
        className="bg-white flex flex-col space-y-2 rounded-md p-4"
      >
        <div className="flex space-x-28">
          <p className="text-custom-orange">Personal Information</p>
          <Dialog>
            <DialogTrigger className="text-blue-500">Change</DialogTrigger>
            <DialogContent>
              <DialogHeader>EDIT PERSONAL INFORMATION</DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="first-line:p-10 flex flex-col gap-5 w-fit h-fit "
              >
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="customer_name">Name</Label>
                  <Input
                    {...register("customer_name")}
                    id="customer_name"
                    autoComplete="off"
                    className={classNames({
                      "border-red-600": errors.customer_name,
                    })}
                    onKeyDown={(e) =>
                      e.code === "Enter" && closeRef.current?.click()
                    }
                  />
                  {errors.customer_name && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors.customer_name?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="student_id">Student ID</Label>
                  <Input
                    {...register("student_id")}
                    id="student_id"
                    autoComplete="off"
                    className={classNames({
                      "border-red-600": errors.student_id,
                    })}
                    onKeyDown={(e) =>
                      e.code === "Enter" && closeRef.current?.click()
                    }
                  />
                  {errors.student_id && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors.student_id?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="customer_phone">Phone</Label>
                  <Input
                    {...register("customer_phone")}
                    id="customer_phone"
                    autoComplete="off"
                    className={classNames({
                      "border-red-600": errors.customer_phone,
                    })}
                    onKeyDown={(e) =>
                      e.code === "Enter" && closeRef.current?.click()
                    }
                  />
                  {errors.customer_phone && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors.customer_phone?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="customer_email">Email Address</Label>
                  <Input
                    {...register("customer_email")}
                    id="customer_email"
                    autoComplete="off"
                    className={classNames({
                      "border-red-600": errors.customer_email,
                    })}
                    onKeyDown={(e) =>
                      e.code === "Enter" && closeRef.current?.click()
                    }
                  />
                  {errors.customer_email && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors.customer_email?.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    reset();
                    closeRef.current?.click();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="submit"
                  onClick={(e) => {
                    closeRef.current?.click();
                  }}
                >
                  Submit
                </Button>
              </form>
              <DialogClose ref={closeRef} />
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <p>{watch("customer_name")}</p>
          <p>{watch("student_id")}</p>
          <p>{watch("customer_phone")}</p>
          <p>{watch("customer_email")}</p>
        </div>
      </section>
      <section
        id="orders-container"
        className="bg-white rounded-sm shadow-md flex flex-col justify-between"
      >
        {children}
        <div id="pickup-container" className="flex justify-between">
          <div className="flex space-x-3">
            <p className="text-blue-400">Order Options</p>
            <p className="text-blue-400">
              {format(currentDate, "PPPP") === String(watch("pickup_date"))
                ? "Immediate Pickup"
                : "Scheduled Pickup"}
            </p>
          </div>
          <Popover>
            <Controller
              name="pickup_date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={classNames({
                        "w-[240px] pl-3 text-left font-normal": true,
                        "text-muted-foreground": !value,
                      })}
                    >
                      {value ? (
                        String(value)
                      ) : (
                        <span>
                          {errors.pickup_date ? (
                            <p className="text-red-600 text-sm mt-2">
                              {errors.pickup_date?.message}
                            </p>
                          ) : (
                            "Choose pickup date"
                          )}
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={value}
                      onSelect={(date) => {
                        date && onChange(format(date, "PPPP"));
                      }}
                      disabled={(date) =>
                        date &&
                        (date <
                          new Date(
                            new Date().setDate(new Date().getDate() - 1)
                          ) ||
                          date >
                            new Date(
                              new Date().setDate(new Date().getDate() + 30)
                            ))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </>
              )}
            />
          </Popover>
        </div>
      </section>

      <section id="payment-method-container">
        <Controller
          name="payment_method"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Tabs
              defaultValue="cash"
              className="w-[400px]"
              onValueChange={onChange}
              value={value}
            >
              <div className="flex justify-between items-center">
                <h2>Payment Method</h2>
                <TabsList>
                  <TabsTrigger value="cash">Cash</TabsTrigger>
                  <TabsTrigger value="g-cash">E-Wallet</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="cash"
                className="flex border-b-2 border-t-2 border-black"
              >
                <p>Cash on pick-up</p>
                <p>Cash on pick-up</p>
              </TabsContent>
              <TabsContent
                value="g-cash"
                className="border-b-2 border-t-2 border-black"
              >
                <RadioGroup defaultValue="g-cash">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="g-cash" id="g-cash" />
                    <Label htmlFor="g-cash">
                      <div className="relative w-10 h-10 object-contain">
                        <Image
                          src="/icons/gcash-logo.svg"
                          alt="gcash"
                          fill
                        ></Image>
                      </div>
                      <p>0912 668 5279</p>
                      <p>Maria C.</p>
                    </Label>
                  </div>
                </RadioGroup>
              </TabsContent>

              <Button variant="submit" onClick={() => handleSubmit(onSubmit)()}>
                CREATE NOW
              </Button>
            </Tabs>
          )}
        />
      </section>
    </>
  );
};

export default CreateOrderForm;
