"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "@/lib/api/categories";
import { createActivity } from "@/lib/api/activity";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";
import { zodResolver } from "@hookform/resolvers/zod";
import { rolePermissions } from "@/lib/permission";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import Image from "next/image";
import { BannerSchema, ValidateBanner } from "@/middleware/zod/banner";
import { createBanner, getAllBanners } from "@/lib/api/banner";
import Permission from "../Permission";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Banners } from "@/types/banners/banners";

const UpdateBanner = () => {
  const { toast } = useToast();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { restricted } = rolePermissions;
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<File[] | null>([]);
  const [imageNumber, setImageNumber] = useState<number>(0);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ValidateBanner>({
    resolver: zodResolver(BannerSchema),
  });

  useEffect(() => {
    if (isAllowed) {
      handleSubmit(onSubmit)();
      setIsAllowed(false);
    }
  }, [isAllowed]);

  useEffect(() => {
    const getBanner = async () => {
      const result: Banners[] = await getAllBanners();
      handleImage(result);
    };
    getBanner();
  }, []);

  const handlePermission = async (permission: boolean, id?: number) => {
    if (permission) {
      setIsAllowed(true);
      id && setAdminId(id);
    }
    !isAllowed && buttonRef.current && buttonRef.current.click();
  };

  const handleImage = (image: Banners[]) => {
    let newBanner: any = [];
    if(!image) return
    if (image && image.length > 0) {
      image.map((photo, index) => {
        const blob = base64ToBlob(photo.banner_image, "image/png");
        const file = new File([blob], `banner${index}.png`, {
          type: "image/png",
        });
        newBanner.push(file);
      });

      setSelectedImage(newBanner);
      setImageNumber(image.length);
    }
  };
  const base64ToBlob = (base64: any, type: any) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  };

  const onSubmit = async (data: ValidateBanner) => {
    if (isAllowed) {
      const form = new FormData();
      for (const file of data.banner_image) {
        form.append("banner_image", file);
      }
      try {
        const response = await createBanner(form);
        if (response.status === 200) {
          await createActivity(
            {
              action: "updated",
              target: "banners",
              object: "banner",
            },
            adminId
          );
          toast({
            description: `You have successfully updated banners.`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Failed to update banners.",
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

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Update Banner</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>UPDATE BANNER</DialogTitle>
            </DialogHeader>
            <div id="banner-preview">
              <Dialog>
                <DialogTrigger
                  className={classNames({
                    "bg-inputColor border border-black w-full h-36 cursor-default":
                      true,
                    "cursor-pointer": selectedImage && selectedImage.length > 0,
                  })}
                >
                  {selectedImage?.[0] && (
                    <div
                      id="preview-image-container"
                      className="relative w-full h-full overflow-hidden"
                    >
                      <Image
                        src={URL.createObjectURL(selectedImage[0])}
                        alt="Selected Image"
                        sizes="min-w-1"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </DialogTrigger>
                {selectedImage && selectedImage.length > 0 && (
                  <DialogContent className="flex justify-center items-center">
                    <div
                      className={classNames({
                        "w-full h-[500px] gap-1 overflow-y-auto flex flex-wrap":
                          true,
                      })}
                    >
                      {selectedImage.map((banner, index) => (
                        <AspectRatio ratio={16 / 9} key={index} className="">
                          <Image
                            src={URL.createObjectURL(banner)}
                            alt="Selected Image"
                            sizes="min-w-1"
                            fill
                            className="rounded-lg object-contain"
                          />
                        </AspectRatio>
                      ))}
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            </div>
            <div className="flex mx-auto mt-2">
              <Label
                htmlFor="banner_image"
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
                <p>{imageNumber === 0 ? "Add Banner" : "Edit Banner"}</p>
                <p>{imageNumber}/10</p>
              </Label>
              <Controller
                name="banner_image"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <>
                    <Input
                      {...field}
                      onChange={(event) => {
                        const selectedFile = event.target.files;
                        if (selectedFile) {
                          const albumFiles = Array.from(selectedFile);
                          onChange(albumFiles);
                          setSelectedImage(albumFiles);
                          setImageNumber(selectedFile?.length);
                        }
                      }}
                      type="file"
                      id="banner_image"
                      multiple
                      className={classNames({
                        "border-red-600": errors.banner_image,
                        hidden: true,
                      })}
                    />
                  </>
                )}
              />
              {errors.banner_image && (
                <p className="text-red-600 text-sm mt-2">
                  <>{errors.banner_image?.message}</>
                </p>
              )}
            </div>
            <DialogFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" ref={buttonRef}>
                    {isSubmitting ? "Submitting" : "Submit"}
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
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateBanner;
