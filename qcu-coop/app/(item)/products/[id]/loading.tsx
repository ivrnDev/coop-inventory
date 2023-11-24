import AddtoCartButton from "@/components/cart/AddtoCartBtn";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import classNames from "classnames";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  return (
    <section className="max-md:relative h-user-main-mobile mt-user-header-mobile pb-14 overflow-y-auto overflow-x-hidden md:h-user-main md:mt-user-header md:py-10 md:px-7">
      <div className="relative h-fit md:rounded-md md:flex md:w-full md:bg-white md:overflow-hidden md:space-x-5 md:p-8">
        <Skeleton className="h-60 w-full max-md:border-black max-md:border-b-2 bg-white md:h-72 md:w-80 md:border" />
        <Skeleton
          id="info-container"
          className="max-md:bg-white max-md:drop-shadow-md px-2 pt-2 flex flex-col gap-2 h-64 md:w-full md:gap-5"
        >
          <Skeleton className="text-lg font-semibold md:text-2xl " />
          <Skeleton className="text-custom-orange w-full px-1 md:hidden bg-slate-300 shadow-md"></Skeleton>
          <div className="mt-2">
            <p> 0 stocks</p>
          </div>
          <Skeleton className="max-md:hidden text-custom-orange bg-[#F8EDED] font-bold text-2xl w-full px-1" />

          <div
            id="variants-container"
            className="flex gap-4 items-center flex-wrap mt-5 md:mt-3"
          >
            <p className=" font-semibold md:text-lg">Variants</p>
            <Skeleton className="text-custom-orange border border-custom-orange bg-white" />
          </div>

          <div className="w-full max-md:h-full flex justify-between max-md:items-end max-md:mb-5 md:mt-2">
            <div>
              <p className="text-lg font-bold text-center md:text-2xl">
                Total Amount
              </p>
              <p className="text-lg font-semibold text-left md:text-2xl">
                <Skeleton />
              </p>
            </div>
            <div id="quantity-container" className="flex items-center gap-2">
              <Button variant="secondary">
                <Minus size={15} />
              </Button>
              <Skeleton className="text-lg font-semibold select-none" />
              <p>0</p>
              <Button variant="secondary">
                <Plus size={15} />
              </Button>
            </div>
          </div>
          <div
            id="button-container"
            className="max-md:hidden flex items-center w-full mt-1 gap-4"
          >
            <Button
              variant="cart"
              className="w-full h-full flex items-center justify-center gap-4 md:gap-6 "
            >
              <Image
                src="/icons/cart-orange.svg"
                alt="cart"
                width={22}
                height={22}
              />
              Add to Cart
            </Button>

            <Button variant="buy" className="w-full h-full">
              BUY NOW
            </Button>
          </div>
        </Skeleton>
      </div>
      <Skeleton
        id="button-container"
        className="flex items-center w-full fixed bottom-[var(--h-user-navbar-mobile)] left-0 md:hidden"
      >
        <Button
          variant="cart"
          className="w-full h-full flex items-center justify-center gap-4 md:gap-6 z-10"
        >
          <Image
            src="/icons/cart-orange.svg"
            alt="cart"
            width={22}
            height={22}
          />
          Add to Cart
        </Button>

        <Button variant="buy" className="w-full h-full">
          BUY NOW
        </Button>
      </Skeleton>

      <div className="bg-white rounded-sm p-3 mt-4 max-md:mx-3 h-64 md:w-full md:p-4">
        <Skeleton className="text-xl font-bold md:text-2xl md:bg-[#EEEDED] md:p-3 ">
          Product Description
        </Skeleton>
        <Skeleton className="mt-3 bg-slate-300 shadow-md"></Skeleton>
      </div>
    </section>
  );
}
