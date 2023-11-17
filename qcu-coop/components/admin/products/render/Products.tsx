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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TrashArchive from "../archive/Archive";

type Props = {
  products: Products[];
};

const AdminRenderProducts = ({ products }: Props) => {
  const { moderate } = rolePermissions;
  const [filter, setFilter] = useState<string>("");
  const filteredProducts = products?.filter((product) => {
    const {
      display_image,
      product_description,
      isDeleted,
      isFeatured,
      ...newProduct
    } = product;
    const productValues = Object.values(newProduct).join(" ").toLowerCase();

    return productValues.includes(filter.toLowerCase());
  });
  return (
    <>
      <div className="w-full flex flex-row p-3 gap-3">
        <Link
          href="products/new"
          className="bg-green-600 text-white text-lg p-5 flex align-middle justify-center w-fit h-fit"
        >
          ADD PRODUCT
        </Link>
        <CreateCategoriesForm />
        <UpdateCategoriesForm />
        <div className="w-1/2 h-8 relative">
          <Search
            className="absolute top-[50%] left-2 translate-y-[-50%]"
            size="20"
          />
          <Input
            type="search"
            placeholder="Search"
            onChange={(e) => setFilter(e.target.value)}
            className="w-full h-full pl-8"
          />
        </div>
        <TrashArchive />
      </div>
      <div className="border border-black rounded-md p-3 h-80 w-full overflow-hidden">
        <div className="h-80 overflow-y-auto">
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
              {products && filteredProducts?.length > 0 ? (
                filteredProducts.map((product, index) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AdminRenderProducts;
