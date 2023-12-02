"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, ValidateLoginForm } from "@/middleware/zod/login";
import classNames from "classnames";
import { loginAdmin } from "@/lib/api/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ValidateLoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: ValidateLoginForm) => {
    const { admin_username, admin_password } = data;
    try {
      const result = await loginAdmin(admin_username, admin_password);
      if (result.status === 200) return router.push("./admin/dashboard");
      reset();
      return setError(true);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-lg h-[400px] m-auto shadow-md">
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
              {isSubmitting ? "Logging In..." : "Log In"}
            </Button>
          </CardFooter>
        </Card>
      </form>
      {error && (
        <Alert
          variant="destructive"
          className="absolute w-96 top-1/3 left-1/2 translate-x-[-50%] bg-red-600 text-white md:w-1/3"
        >
          <AlertTitle className="md:text-lg font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 md:h-6 md:w-6" color="white" />
            Failed to login
          </AlertTitle>
          <AlertDescription className="mt-3 md:text-base indent-6">
            Invalid Username or password.
            <Button
              type="button"
              variant="ghost"
              onClick={() => setError(false)}
              className="float-right mt-2"
            >
              Okay
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
