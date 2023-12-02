import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Trash2 } from "lucide-react";
import Image from "next/image";

const LoadingProducts = () => {
  const skeletonTable = new Array(4).fill(null);
  return (
    <section className="h-admin-main p-5 overflow-hidden">
      <div className="w-full flex flex-row items-center p-3 gap-3">
        <div className="w-fit h-fit">
          <Button variant="outline">Add Product</Button>
        </div>
        <Button variant={"outline"}>Create Category</Button>
        <Button variant={"outline"}>Update Category</Button>
        <div className="w-1/2 h-8 relative ml-15">
          <Search
            className="absolute top-[50%] left-2 translate-y-[-50%]"
            size="20"
          />
          <Input
            type="search"
            placeholder="Search"
            className="w-[50%] h-full pl-8"
          />
        </div>
        <div className="bg-red-600 rounded-md p-1">
          <Trash2 color="white" />
        </div>
      </div>

      <div className="relative border border-black rounded-md p-3 h-96 w-full overflow-hidden">
        <div className="h-full overflow-y-auto">
          <Skeleton className="h-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Image</TableHead>
                  <TableHead>Product ID</TableHead>
                  <TableHead className="text-center">Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stocks</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-center">Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skeletonTable?.map((product, index) => (
                  <TableRow key={index} className="text-center">
                    <TableCell>
                      <Skeleton className="relative w-10 h-12 object-contain"></Skeleton>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell className="capitalize"></TableCell>
                    <TableCell className="capitalize"></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="capitalize"></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="flex gap-3">
                      <Button
                        type="button"
                        className="bg-[#1E88E5] rounded-md p-2 flex gap-2 justify-center items-center text-white"
                      >
                        <Image
                          src="/icons/edit-icon.svg"
                          alt="edit"
                          width={20}
                          height={20}
                        />
                        View
                      </Button>
                      <div
                        className="bg-[#FB392D] rounded-md p-2 flex gap-2
                    justify-center items-center text-white font-bold"
                      >
                        <Image
                          src="/icons/trash-icon.svg"
                          alt="edit"
                          width={20}
                          height={20}
                        />
                        Delete
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Skeleton>
        </div>
      </div>
    </section>
  );
};

export default LoadingProducts;
