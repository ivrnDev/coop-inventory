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
import {
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
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
          className="absolute w-96 top-[20%] left-[50%] translate-x-[-50%] bg-red-600 text-white"
        >
          <AlertCircle className="h-4 w-4" color="white" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Invalid Username or password. Please log in again.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
