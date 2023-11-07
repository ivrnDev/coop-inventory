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

type Props = {
  orders: ValidateOrder[];
};

const CreateOrderForm = ({ orders }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ValidateCustomer>({
    resolver: zodResolver(CustomerSchema),
  });

  const onSubmit = (data: ValidateCustomer) => {};

  return (
    <div className="flex place-items-center justify-center h-screen bg-slate-600">
      <div>
        <h1 className="text-center">EDIT PERSONAL INFORMATION</h1>
        <Dialog>
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-red-500 p-10 flex flex-col gap-5 w-fit h-fit "
            >
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="customer_name">Display Name</Label>
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
                <Label htmlFor="student_id">Display Name</Label>
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
                <Label htmlFor="customer_phone">Display Name</Label>
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
                <Label htmlFor="customer_email">Display Name</Label>
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

              {/* <button type="submit">CREATE NOW</button> */}
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateOrderForm;
