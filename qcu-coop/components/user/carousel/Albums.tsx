"use client";
import { ProductAlbum } from "@/types/products/products";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
  albums: ProductAlbum[];
  image: String;
};

const Albums = ({ albums, image }: Props) => {
  console.log(albums);
  return (
    <>
      {albums?.length === 0 ||
        (!albums && image && (
          <div className="relative h-60 w-full border-black border-b-2 bg-white">
            <Image
              src={`data:image/png;base64,${image}`}
              alt={`display-image`}
              sizes="min-h-1"
              priority
              fill
              className="object-contain"
            />
          </div>
        ))}
      {albums && (
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          interval={3000}
          className="h-60"
        >
          {albums.map((album, index) => (
            <div
              key={index}
              className="relative h-60 w-full border-black border-b-2 bg-white"
            >
              <Image
                src={`data:image/png;base64,${album.product_photo}`}
                alt={`album${album.product_id}`}
                sizes="min-h-1"
                priority
                fill
                className="object-contain"
              />
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Albums;
