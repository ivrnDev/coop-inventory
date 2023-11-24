"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";

import Permission from "../../Permission";
import { rolePermissions } from "@/lib/permission";
import { useToast } from "@/components/ui/use-toast";
import { createActivity } from "@/lib/api/activity";
import { updateLogin } from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { LoginSchema, ValidateLoginForm } from "@/middleware/zod/login";

const UpdatePassword = () => {
  const { toast } = useToast();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { restricted } = rolePermissions;
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<number>(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ValidateLoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const handlePermission = async (permission: boolean, id?: number) => {
    if (permission) {
      setIsAllowed(true);
      id && setAdminId(id);
    }
    !isAllowed && buttonRef.current && buttonRef.current.click();
  };

  const onSubmit = async (data: ValidateLoginForm) => {
    try {
      const response = await updateLogin(
        data.admin_username,
        data.admin_password
      );
      if (response.status === 201) {
        await createActivity(
          {
            action: "updated",
            target: "login",
            object: "details",
          },
          adminId
        );
        toast({
          description: `You have successfully updated login details`,
        });
        reset();
      } else {
        toast({
          variant: "destructive",
          title: `Failed to update login details`,
          description: `${response.data.message}`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Internal Server Error.",
        description: `Something went wrong.`,
      });
    }
  };

  useEffect(() => {
    if (isAllowed) {
      handleSubmit(onSubmit)();
      setIsAllowed(false);
    }
  }, [isAllowed]);

  return (
    <>
      <Dialog>
        <DialogTrigger className="bg-green-600 p-2 flex items-center space-x-2">
          <p className="text-white whitespace-nowrap">Update Login</p>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
            <Label
              htmlFor="admin_username"
              className="font-bold whitespace-nowrap"
            >
              Username
            </Label>
            <Input
              {...register("admin_username")}
              id="admin_username"
              autoComplete="off"
              className={classNames({
                "border-red-600": errors.admin_username,
                "bg-inputColor border-black": true,
              })}
            />
            {errors.admin_username && (
              <p className="text-red-600 text-sm mt-2">
                <>{errors.admin_username?.message}</>
              </p>
            )}

            <Label
              htmlFor="admin_password"
              className="font-bold whitespace-nowrap"
            >
              Password
            </Label>
            <Input
              {...register("admin_password")}
              id="admin_password"
              autoComplete="off"
              className={classNames({
                "border-red-600": errors.admin_password,
                "bg-inputColor border-black": true,
              })}
            />
            {errors.admin_password && (
              <p className="text-red-600 text-sm mt-2">
                <>{errors.admin_password?.message}</>
              </p>
            )}
          </form>
          <DialogFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="submit"
                  ref={buttonRef}
                  className="flex space-x-3"
                >
                  <p className="text-lg whitespace-nowrap">
                    {isSubmitting ? "Updating Login" : "Update Login"}
                  </p>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <Permission
                  roles={restricted}
                  handlePermission={handlePermission}
                />
              </DialogContent>
            </Dialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdatePassword;
