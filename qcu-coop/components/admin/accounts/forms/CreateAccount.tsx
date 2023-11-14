"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm, Controller } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import Image from "next/image";

import Permission from "../../Permission";
import { rolePermissions } from "@/lib/permission";
import { useToast } from "@/components/ui/use-toast";
import { createActivity } from "@/lib/api/activity";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ValidateAccount, AccountSchema } from "@/middleware/zod/accounts";
import { createAdmin } from "@/lib/api/admin";

const roles = ["administrator", "moderator", "employee"];

const CreateAccount = () => {
  const { toast } = useToast();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { restricted } = rolePermissions;
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageNumber, setImageNumber] = useState<number>(0);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ValidateAccount>({
    resolver: zodResolver(AccountSchema),
  });

  const handlePermission = async (permission: boolean, id?: number) => {
    if (permission) {
      setIsAllowed(true);
      id && setAdminId(id);
    }
    !isAllowed && buttonRef.current && buttonRef.current.click();
  };

  const onSubmit = async (data: ValidateAccount) => {
    const { admin_name, role } = data;
    if (isAllowed) {
      const form = new FormData();
      for (const key of Object.keys(data) as (keyof typeof data)[]) {
        form.append(key, data[key]);
      }
      try {
        const response = await createAdmin(form);
        if (response.status === 201) {
          await createActivity(
            {
              action: "added",
              target: "account",
              object: admin_name,
              change: role,
            },
            adminId
          );
          toast({
            description: `You have successfully added ${admin_name} as ${role}`,
          });
          reset();
        } else {
          toast({
            variant: "destructive",
            title: `Failed to add ${admin_name} as ${role}`,
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
        <DialogTrigger>Add User</DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
            <div id="first-section" className="p-5 flex flex-col space-y-5">
              <Label className="font-bold">Profile Picture</Label>
              <div id="image-container" className="flex space-x-2">
                <div id="product-image-preview">
                  <Dialog>
                    <DialogTrigger
                      className={classNames({
                        "bg-inputColor border border-black w-24 h-24 cursor-default":
                          true,
                        "cursor-pointer": selectedImage,
                      })}
                    >
                      {selectedImage && (
                        <div
                          id="preview-image-container"
                          className="relative w-full h-full object-contain"
                        >
                          <Image
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected Image"
                            sizes="min-w-1"
                            fill
                          />
                        </div>
                      )}
                    </DialogTrigger>
                    {selectedImage && (
                      <DialogContent>
                        <AspectRatio ratio={10 / 10} className="absolute">
                          <Image
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected Image"
                            sizes="min-w-1"
                            fill
                            className="rounded-lg object-cover"
                          />
                        </AspectRatio>
                      </DialogContent>
                    )}
                  </Dialog>
                </div>
                <div className="flex">
                  <Label
                    htmlFor="profile_picture"
                    className="bg-inputColor border border-black hover:cursor-pointer w-24 h-24 flex flex-col justify-center items-center"
                  >
                    <div id="add-icon-container" className="relative w-10 h-10">
                      <Image
                        src="/icons/add-image-icon.svg"
                        alt="add-image-icon"
                        sizes="min-w-1"
                        fill
                      />
                    </div>
                    <p>Add Picture</p>
                    <p>{imageNumber}/1</p>
                  </Label>
                  <Controller
                    name="profile_picture"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                      <Input
                        {...field}
                        onChange={(event) => {
                          const selectedFile = event.target.files;
                          if (selectedFile) {
                            const imageFile = selectedFile[0];
                            onChange(imageFile);
                            setSelectedImage(imageFile);
                            setImageNumber(selectedFile.length);
                          }
                        }}
                        type="file"
                        id="profile_picture"
                        className={classNames({
                          "border-red-600": errors.profile_picture,
                          hidden: true,
                        })}
                      />
                    )}
                  />
                  {errors.profile_picture && (
                    <p className="text-red-600 text-sm mt-2">
                      <>{errors.profile_picture?.message}</>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
                <Label htmlFor="admin_name" className="font-bold">
                  Name
                </Label>
                <Input
                  {...register("admin_name")}
                  id="admin_name"
                  autoComplete="off"
                  className={classNames({
                    "border-red-600": errors.admin_name,
                    "bg-inputColor border-black": true,
                  })}
                />
                {errors.admin_name && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.admin_name?.message}</>
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
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
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
                <Label
                  htmlFor="admin_password"
                  className="font-bold whitespace-nowrap"
                >
                  Password
                </Label>
                <Input
                  {...register("admin_password")}
                  id="admin_password"
                  type="password"
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
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
                <Label htmlFor="category_id" className="font-bold">
                  Role
                </Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="role"
                          className={classNames({
                            "border-red-600": errors.role,
                            "bg-inputColor border-black": true,
                          })}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            {roles.map((role, index) => (
                              <SelectItem value={role} key={index}>
                                <p className="capitalize">{role}</p>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </>
                  )}
                />
                {errors.role && (
                  <p className="text-red-600 text-sm mt-2">
                    <>{errors.role?.message}</>
                  </p>
                )}
              </div>
            </div>
          </form>
          <DialogFooter>
            <Dialog>
              <DialogTrigger
                ref={buttonRef}
                className="absolute right-5 bottom-5 h-fit w-[14%] flex space-x-3 bg-green-700"
              >
                <div className="relative w-5 h-5 float-left">
                  <Image
                    src="/icons/add-sign-icon.svg"
                    alt="add-sign"
                    sizes="min-w-1"
                    fill
                  />
                </div>
                <p className="text-lg whitespace-nowrap">
                  {isSubmitting ? "Adding User" : "Add User"}
                </p>
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

export default CreateAccount;
