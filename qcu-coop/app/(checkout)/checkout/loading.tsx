import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronUp } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  const skeletonCards = new Array(2).fill(null);
  return (
    <div className="h-user-main-mobile overflow-y-auto md:h-user-main md:py-2 md:px-7">
      <section
        id="personal-info-container"
        className="shadow-sm bg-white flex flex-col space-y-2 rounded-md p-4 h-28 md:h-48"
      >
        <div className="flex justify-between">
          <p className="text-custom-orange md:text-2xl">Personal Information</p>
          <p className="text-blue-500 md:text-2xl">Change</p>
        </div>
      </section>

      <section
        id="orders-container"
        className="relative bg-white rounded-sm shadow-md flex flex-col justify-between mt-5"
      >
        <h1 className="font-semibold text-lg absolute max-md:top-1 max-md:left-2 z-20 md:text-xl md:font-bold md:top-5 md:left-5">
          PRODUCTS ORDERED
        </h1>
        <Skeleton className="h-60 overflow-y-auto px-1 mt-7 md:h-fit md:p-3">
          <Table>
            <TableHeader className="">
              <TableRow className="whitespace-nowrap text-center text-sm md:text-lg">
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Item Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              <TableRow className="">
                <TableCell className="h"></TableCell>
              </TableRow>
              <TableRow className="">
                <TableCell className=""></TableCell>
              </TableRow>
              <TableRow className="">
                <TableCell className=""></TableCell>
              </TableRow>
              <TableRow className="">
                <TableCell className=""></TableCell>
              </TableRow>
              <TableRow className="">
                <TableCell className=""></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Skeleton>

        <div
          id="pickup-container"
          className="flex h-12 max-md:justify-between items-center border-black border-y-2 px-1 md:p-3 md:space-x-3"
        >
          <div className="flex space-x-3 items-center">
            <p className="text-blue-400 text-sm md:text-lg">Order Options</p>
            <p className="text-sm md:text-lg">Select Pickup Date</p>
          </div>
        </div>
        <Skeleton className="flex max-md:justify-between px-1 float-right justify-self-end md:space-x-3 md:items-center md:text-lg md:p-3">
          <p className="text-sm">{`Order Total: (0 items)`}</p>
          <p className="text-custom-orange font-bold">₱ 0.00</p>
        </Skeleton>
      </section>

      <section className="bg-white flex flex-col max-md:mb-user-navbar-mobile w-full h-60 max-md:fixed max-md:-bottom-[12.6rem] max-md:right-0 max-md:transition-transform md:h-80 md:mt-5">
        <ChevronUp
          width={25}
          height={25}
          color="black"
          className="absolute top-0 right-0 cursor-pointer md:hidden"
        />
        <Tabs defaultValue="cash">
          <div className="flex justify-between items-center px-1 mr-7 md:p-3">
            <h2 className="font-semibold md:text-xl">Payment Method</h2>
            <TabsList className="flex space-x-5 bg-transparent md:space-x-7">
              <TabsTrigger
                value="cash"
                className="border p-1 border-black data-[state=active]:text-custom-orange data-[state=active]:border-custom-orange md:p-3"
              >
                Cash
              </TabsTrigger>
              <TabsTrigger
                value="g-cash"
                className="border p-1 border-black data-[state=active]:text-custom-orange data-[state=active]:border-custom-orange md:p-3"
              >
                E-Wallet
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="cash" className="w-full mt-5 md:mt-8">
            <div className="border-b-2 border-t-2 border-black py-3 w-full flex justify-around md:py-7 md:text-lg ">
              <p>Cash on pick-up</p>
              <p>Cash on pick-up</p>
            </div>
          </TabsContent>

          <TabsContent value="g-cash" className="w-full mt-5">
            <div className="border-b-2 border-t-2 border-black py-3 px-4 md:py-6 md:px-6">
              <div className="flex w-full justify-between items-center md:text-lg">
                <div className="flex gap-4 items-center md:space-x-5">
                  <Input type="radio" checked className="w-5 text-blue-900" />
                  <div className="relative w-10 h-10 md:w-14 md:h-14 ">
                    <Image
                      src="/icons/gcash-logo.svg"
                      alt="gcash"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-blue-500">0912 668 5279</p>
                <p className="text-blue-500">Maria C.</p>
                <Dialog>
                  <DialogTrigger className="bg-blue-500 h-fit px-1 text-sm md:text-lg">
                    Input Transaction Details
                  </DialogTrigger>
                  <DialogContent className="w-2/3">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="reference_number">Reference Number</Label>
                      <Input id="reference_number" autoComplete="off" />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex flex-col gap-1 max-md:mb-user-navbar-mobile max-md:absolute max-md:bottom-1 max-md:right-3 md:text-lg md:w-1/2 md:self-end md:mt-5">
          <div className="flex gap-2 items-center">
            <p className="">Total Payment:</p>
            <p className="text-custom-orange font-bold text-lg md:text-2xl">
              ₱ 0.00
            </p>
          </div>
          <Button
            type="submit"
            variant="cart"
            className="bg-custom-orange text-white"
          >
            Place Order
          </Button>
        </div>
      </section>
    </div>
  );
}
