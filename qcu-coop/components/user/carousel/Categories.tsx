"use client";
import { Categories } from "@/types/products/products";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
  categories: Categories[];
};

const CategoriesCarousel = ({ categories }: Props) => {
  return (
    <>
      {categories &&
        categories.map((category, index) => (
          <Link
            key={index}
            href={`/products?category=${category.category_name}`}
            className="flex flex-col bg-white rounded-md shadow-md hover:opacity-80"
          >
            <div className="relative h-full w-36 overflow-hidden flex flex-col md:w-60">
              <Image
                src={`data:image/png;base64,${category.category_image}`}
                alt={category.category_name}
                className="object-contain "
                fill
              />
            </div>
            <p className=" font-bold mt-2 text-center capitalize md:text-xl">
              {category.category_name}
            </p>
          </Link>
        ))}
    </>
  );
};

export default CategoriesCarousel;
