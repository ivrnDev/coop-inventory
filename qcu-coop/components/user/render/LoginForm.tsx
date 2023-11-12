"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, ValidateLoginForm } from "@/middleware/zod/login";
import classNames from "classnames";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ValidateLoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: ValidateLoginForm) => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className=" w-[30%] m-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="admin_username">Username</Label>
            <Input
              {...register("admin_username")}
              id="admin_username"
              type="text"
              autoComplete="off"
              className={classNames({
                "border-red-600": errors.admin_username,
              })}
            />
            {errors.admin_username && (
              <p className="text-red-600 text-sm mt-2">
                {errors.admin_username?.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="admin_password">Password</Label>
            <Input
              {...register("admin_password")}
              id="admin_password"
              type="password"
              className={classNames({
                "border-red-600": errors.admin_password,
              })}
            />
            {errors.admin_password && (
              <p className="text-red-600 text-sm mt-2">
                {errors.admin_password?.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
