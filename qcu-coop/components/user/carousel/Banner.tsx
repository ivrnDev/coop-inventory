"use client";
import { Banners } from "@/types/banners/banners";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
type Props = {
  banners: Banners[];
};
const Banner = ({ banners }: Props) => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showArrows={false}
      interval={4000}
      showThumbs={true}
    >
      {banners &&
        banners.map((banner, index) => (
          <div key={index} className="w-full h-40 md:h-96 overflow-hidden">
            <Image
              src={`data:image/png;base64,${banner.banner_image}`}
              alt={`banner${index}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
    </Carousel>
  );
};

export default Banner;
