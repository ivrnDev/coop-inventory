"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import classNames from "classnames";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "@/lib/api/orders";
import { ValidateCustomer, CustomerSchema } from "@/middleware/zod/customer";
import { ValidateOrder } from "@/middleware/zod/orders";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  orders: ValidateOrder[];
  children: React.ReactNode;
};

const CreateOrderForm = ({ orders, children }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ValidateCustomer>({
    resolver: zodResolver(CustomerSchema),
  });

  const onSubmit = (data: ValidateCustomer) => {
  };

  return (
    <div className="flex place-items-center justify-center h-screen bg-slate-600">
      <div>
        <h1 className="text-center">EDIT PERSONAL INFORMATION</h1>
        <Dialog>
          <DialogTrigger>Change</DialogTrigger>
          <DialogContent>
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
                />
                {errors.customer_email && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.customer_email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="payment_method">Payment Method</Label>
                <Input
                  {...register("payment_method")}
                  id="payment_method"
                  autoComplete="off"
                  className={classNames({
                    "border-red-600": errors.payment_method,
                  })}
                />
                {errors.payment_method && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.payment_method?.message}
                  </p>
                )}
              </div>
              {/* <Button
                variant="submit"
                type="submit"
                onClick={() => handleSubmit(onSubmit)()}
              >
                CREATE NOW
              </Button> */}
            </form>
          </DialogContent>
        </Dialog>
        {children}
        <div>
          <Button
            variant="submit"
            onClick={() => handleSubmit(onSubmit)()}
          >
            CREATE NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderForm;
