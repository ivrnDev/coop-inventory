"use client";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { adminPermission } from "@/lib/api/admin";
import { useRef } from "react";

type Props = {
  roles: string[];
  handlePermission: (permission: boolean) => void;
};

const Permission = ({ roles, handlePermission }: Props) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast();
  const { register: register2, handleSubmit: handleSubmit2 } = useForm<any>({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await adminPermission(roles, data.password);
      if (response.status === 200) {
        toast({
          title: "Access Granted!",
          description: "You have successfully grant a permission!",
        });
        handlePermission(true);
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied!!!",
          description: "You don't have a permission in this request!",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        handlePermission(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "There was a problem with your request",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <>
      Please type your password:
      <form onSubmit={handleSubmit2(onSubmit)}>
        <Input {...register2("password")} id="password" type="password" />
      </form>
    </>
  );
};

export default Permission;
