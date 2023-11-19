"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Products } from "@/types/products/products";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "../buttons/DeleteButton";
import { rolePermissions } from "@/lib/permission";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CreateCategoriesForm from "../forms/CreateCategories";
import UpdateCategoriesForm from "../forms/UpdateCategories";
import TrashArchive from "../archive/Archive";

type Props = {
  products: Products[];
};

const AdminRenderProducts = ({ products }: Props) => {
  const { moderate } = rolePermissions;
  const [filter, setFilter] = useState<string>("");
  const filteredProducts = products?.filter((product) => {
    const {
      product_name,
      product_id,
      product_stocks,
      date_created,
      category_name,
    } = product;

    return (
      product_name.includes(filter.toLowerCase()) ||
      String(product_id).includes(filter.toLowerCase()) ||
      String(product_stocks).includes(filter.toLowerCase()) ||
      date_created.includes(filter.toLowerCase()) ||
      category_name.includes(filter.toLowerCase())
    );
  });
  return (
    <>
      <div className="w-full flex flex-row items-center p-3 gap-3">
        <Link href="products/new" className="w-fit h-fit">
          <Button variant="outline">Add Product</Button>
        </Link>
        <CreateCategoriesForm />
        <UpdateCategoriesForm />
        <div className="w-1/2 h-8 relative ml-15">
          <Search
            className="absolute top-[50%] left-2 translate-y-[-50%]"
            size="20"
          />
          <Input
            type="search"
            placeholder="Search"
            onChange={(e) => setFilter(e.target.value)}
            className="w-[50%] h-full pl-8"
          />
        </div>
        <TrashArchive />
      </div>

      <div className="relative border border-black rounded-md p-3 h-80 w-full overflow-hidden">
        <div className="h-80 overflow-y-auto">
          {filteredProducts?.length > 0 ? (
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
                {filteredProducts.map((product, index) => (
                  <TableRow key={index} className="text-center">
                    <TableCell>
                      <div className="relative w-10 h-12 object-contain">
                        <Image
                          src={`data:image/png;base64,${product.display_image}`}
                          alt={product.product_name}
                          sizes="min-w-1"
                          fill
                        />
                      </div>
                    </TableCell>
                    <TableCell>{product.product_id}</TableCell>
                    <TableCell className="capitalize">
                      {product.product_name}
                    </TableCell>
                    <TableCell className="capitalize">
                      {product.category_name}
                    </TableCell>
                    <TableCell>{product.product_stocks}</TableCell>
                    <TableCell>₱ {product.display_price}</TableCell>
                    <TableCell className="capitalize">
                      {product.status}
                    </TableCell>
                    <TableCell>
                      {product.isFeatured === 1 ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <Link
                        href={`./products/update/${product.product_name.toLowerCase()}?${new URLSearchParams(
                          {
                            id: String(product.product_id),
                          }
                        )}
                  `}
                      >
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
                          EDIT
                        </Button>
                      </Link>
                      <div>
                        <DeleteButton
                          roles={moderate}
                          target={{
                            id: product.product_id,
                            object: product.product_name,
                            target: "product",
                          }}
                          message={{
                            success: `Sucessfully deleted ${product.product_name} product`,
                            failed: `Failed to delete ${product.product_name} product`,
                          }}
                          deleteTarget="deleteProduct"
                          isDeleted="1"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <h1 className="text-2xl font-semibold absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] ">
              No Available Products
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminRenderProducts;
