"use client";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { adminPermission } from "@/lib/api/admin";

type Props = {
  roles: string[];
  handlePermission: (permission: boolean, id?: number) => void;
};

const Permission = ({ roles, handlePermission }: Props) => {
  const { toast } = useToast();
  const { register: register2, handleSubmit: handleSubmit2 } = useForm<any>({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await adminPermission(roles, data.password);
      const { admin_id } = response.data[0];
      if (response.status === 200) {
        // toast({
        //   title: "Access Granted.",
        //   description: "You have successfully grant a permission.",
        // });
        handlePermission(true, admin_id);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Access Denied.",
        description: "You don't have a permission in this action.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      handlePermission(false);
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
