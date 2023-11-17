import { z } from "zod";

export const BannerSchema = z.object({
  banner_image: z.any().refine(
    (files) => {
      if (!files) return true;
      for (const file of files) {
        const allowedFileTypes = ["image/jpeg", "image/png"];
        if (!allowedFileTypes.includes(file.type)) {
          return false;
        }
      }
      return true;
    },
    {
      message: "Invalid file type. Only JPEG and PNG images are allowed.",
    }
  ),
});

export type ValidateBanner = z.infer<typeof BannerSchema>;
