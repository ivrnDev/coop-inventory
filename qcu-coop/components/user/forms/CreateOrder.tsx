"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

import classNames from "classnames";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "@/lib/api/orders";
import { CustomerSchemaFunction } from "@/middleware/zod/customer";
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
import { AlertCircle, CalendarIcon, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { OrderProduct } from "@/types/orders/orders";
import { useRouter } from "next/navigation";
type Props = {
  orders: ValidateOrder[];
  orderInfo: OrderProduct[];
  children: React.ReactNode;
};

const CreateOrderForm = ({ orders, orderInfo, children }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const currentDate = new Date();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const exitRef = useRef<HTMLButtonElement | null>(null);
  const [isCash, setIsCash] = useState<boolean>(true);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isOpen, setisOpen] = useState<boolean>(false);
  const CustomerSchema = CustomerSchemaFunction(isCash);
  const [total, setTotal] = useState<number>(0);
  type ValidateCustomer = z.infer<typeof CustomerSchema>;
  const {
    register,
    handleSubmit,
    resetField,
    control,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ValidateCustomer>({
    resolver: zodResolver(CustomerSchema),
  });

  useEffect(() => {
    const total = orderInfo.reduce((acc, v) => acc + v.amount, 0);
    setTotal(total);
  }, []);
  const onSubmit = async (data: ValidateCustomer) => {
    const orderData = {
      customer: data,
      orders,
    };

    try {
      const order = await createOrder(orderData);
      if (order.status === 201) return router.push("./receipt");
      setErrorMessage(order.data.message);
      setIsFailed(true);
      return;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };
  useEffect(() => {
    resetField("payment_method", { defaultValue: "cash" });
  }, []);

  useEffect(() => {
    watch("payment_method") !== "cash" ? setIsCash(false) : setIsCash(true);
  }, [watch("payment_method")]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section
          id="personal-info-container"
          className="shadow-sm bg-white flex flex-col space-y-2 rounded-md p-4 h-28 md:h-48"
        >
          <div className="flex justify-between">
            <p className="text-custom-orange md:text-xl">
              Personal Information
            </p>
            <Dialog>
              <DialogTrigger
                className={classNames({
                  "text-red-600 font-bold": Object.values(errors).some(
                    (error) => error !== undefined
                  ),
                  "text-blue-500 md:text-xl": true,
                })}
              >
                Change
              </DialogTrigger>
              <DialogContent className="w-3/4">
                <DialogHeader className="text-lg font-bold">
                  EDIT PERSONAL INFORMATION
                </DialogHeader>
                <div className="p-2 flex flex-col gap-5 w-fit h-fit">
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

                  <div className="flex gap-3">
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
                  <div className="flex w-full justify-between gap-5 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        resetField("customer_name");
                        resetField("student_id");
                        resetField("customer_phone");
                        resetField("customer_email");
                        closeRef.current?.click();
                      }}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="submit"
                      onClick={(e) => {
                        closeRef.current?.click();
                      }}
                      className="bg-blue-500 w-full"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
                <DialogClose ref={closeRef} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex space-x-4">
              <p
                className={classNames({
                  "text-red-600 font-semibold":
                    errors.customer_name?.message !== undefined,
                })}
              >
                {watch("customer_name")}
              </p>
              <p
                className={classNames({
                  "text-gray-400": true,
                  "text-red-600 font-semibold":
                    errors.student_id?.message !== undefined,
                })}
              >
                {watch("student_id")}
              </p>
              <p
                className={classNames({
                  "text-gray-400": true,
                  "text-red-600 font-semibold":
                    errors.customer_phone?.message !== undefined,
                })}
              >
                {watch("customer_phone")}
              </p>
            </div>
            <p
              className={classNames({
                "text-red-600 font-semibold":
                  errors.customer_email?.message !== undefined,
              })}
            >
              {watch("customer_email")}
            </p>
          </div>
        </section>

        <section
          id="orders-container"
          className="relative bg-white rounded-sm shadow-md flex flex-col justify-between mt-5"
        >
          <h1 className="font-semibold text-lg absolute max-md:top-1 max-md:left-2 z-20 md:text-xl md:font-bold md:top-5 md:left-5">
            PRODUCTS ORDERED
          </h1>
          <div className="h-60 overflow-y-auto px-1 mt-7 md:h-fit md:p-3">
            {children}
          </div>
          <div
            id="pickup-container"
            className="flex max-md:justify-between items-center border-black border-y-2 px-1 md:p-3 md:space-x-3"
          >
            <div className="flex space-x-3 items-center">
              <p className="text-blue-400 text-sm md:text-lg">Order Options</p>
              <p className="text-sm md:text-lg">
                {format(currentDate, "PP") === String(watch("pickup_date"))
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
                          "w-fit pl-3 text-left font-xs whitespace-nowrap flex gap-2":
                            true,
                          "text-muted-foreground": !value,
                        })}
                      >
                        {value ? (
                          <p className="text-sm">
                            {format(new Date(value), "PPPP")}
                          </p>
                        ) : (
                          <div>
                            {errors.pickup_date ? (
                              <p className="text-red-600 text-sm mt-2">
                                {errors.pickup_date?.message}
                              </p>
                            ) : (
                              "Choose pickup date"
                            )}
                          </div>
                        )}
                        <CalendarIcon className="h-5 w-5 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(value)}
                        onSelect={(date) => {
                          date && onChange(format(date, "PP"));
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
          <div className="flex max-md:justify-between px-1 float-right justify-self-end md:space-x-3 md:items-center md:text-lg md:p-3">
            <p className="text-sm">{`Order Total: (${orders.length} items)`}</p>
            <p className="text-custom-orange font-bold">
              ₱{" "}
              {total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </section>

        <section
          id="payment-method-container"
          className={classNames({
            "bg-white max-md:mb-user-navbar-mobile overflow-hidden w-full h-60 max-md:fixed max-md:-bottom-[12.6rem] max-md:right-0 max-md:transition-transform md:mt-5":
              true,
            "-translate-y-44": isOpen,
          })}
        >
          <ChevronUp
            width={25}
            height={25}
            color="black"
            onClick={() => setisOpen((open) => !open)}
            className={classNames({
              "absolute top-0 right-0 cursor-pointer": true,
              "rotate-180 ": isOpen,
            })}
          />
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
                <div className="flex justify-between items-center px-1">
                  <h2 className="font-semibold">Payment Method</h2>
                  <TabsList className="flex space-x-5 bg-transparent">
                    <TabsTrigger
                      value="cash"
                      className="border p-1 border-black data-[state=active]:text-custom-orange data-[state=active]:border-custom-orange"
                    >
                      Cash
                    </TabsTrigger>
                    <TabsTrigger
                      value="g-cash"
                      className="border p-1 border-black data-[state=active]:text-custom-orange data-[state=active]:border-custom-orange"
                    >
                      E-Wallet
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="cash" className="w-screen mt-5">
                  <div className="border-b-2 border-t-2 border-black py-3 w-screen flex justify-around">
                    <p>Cash on pick-up</p>
                    <p>Cash on pick-up</p>
                  </div>
                </TabsContent>
                <TabsContent value="g-cash" className="w-screen mt-5">
                  <RadioGroup
                    defaultValue="g-cash"
                    className="border-b-2 border-t-2 border-black py-3 w-full px-4"
                  >
                    <div className="flex items-center space-x-3 md:space-x-1">
                      <RadioGroupItem value="g-cash" id="g-cash" />
                      <div className="flex w-full justify-between items-center md:text-lg">
                        <div className="relative w-10 h-10 md:w-14 md:h-14 ">
                          <Image
                            src="/icons/gcash-logo.svg"
                            alt="gcash"
                            fill
                            className="object-contain"
                          ></Image>
                        </div>
                        <p className="text-blue-500">0912 668 5279</p>
                        <p className="text-blue-500">Maria C.</p>
                        <Dialog>
                          <DialogTrigger
                            ref={exitRef}
                            className={classNames({
                              "text-red-600 font-bold border-red-600 bg-transparent":
                                errors.reference_number?.message !== undefined,
                              "text-white border-none":
                                errors.reference_number?.message === undefined,
                              "bg-blue-500 h-fit px-1 text-sm": true,
                            })}
                          >
                            Input Transaction Details
                          </DialogTrigger>
                          <DialogContent className="w-2/3">
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="reference_number">
                                Reference Number
                              </Label>
                              <Input
                                {...register("reference_number")}
                                id="reference_number"
                                autoComplete="off"
                                className={classNames({
                                  "border-red-600": errors.reference_number,
                                })}
                                onKeyDown={(e) =>
                                  e.code === "Enter" && exitRef.current?.click()
                                }
                              />
                              {errors.reference_number && (
                                <p className="text-red-600 text-sm mt-2">
                                  {errors.reference_number?.message}
                                </p>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </RadioGroup>
                </TabsContent>

                <div className="flex flex-col gap-1 mb-user-navbar-mobile max-md:absolute max-md:bottom-1 max-md:right-3">
                  <div className="flex gap-2">
                    <p className="">Total Payment:</p>
                    <p className="text-custom-orange font-bold text-lg">
                      ₱{" "}
                      {total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    variant="cart"
                    className="bg-custom-orange text-white "
                  >
                    {isSubmitting ? "Placing Order" : "Place Order"}
                  </Button>
                </div>
              </Tabs>
            )}
          />
        </section>
      </form>

      {isFailed && (
        <Alert
          variant="destructive"
          className="bg-white fixed top-[40%] left-1/2 -translate-x-1/2 w-3/4 h-fit md:w-1/2 "
        >
          <AlertTitle className="flex items-center  font-semibold md:text-xl gap-3">
            <AlertCircle width={17} height={17} color="red" />
            Failed to place order.
          </AlertTitle>
          <AlertDescription className="text-sm md:text-lg indent-8 mt-2">
            {errorMessage}.
          </AlertDescription>
          <Button
            variant="outline"
            onClick={() => setIsFailed(false)}
            className="float-right h-7 text-black"
          >
            Okay
          </Button>
        </Alert>
      )}
    </>
  );
};

export default CreateOrderForm;
