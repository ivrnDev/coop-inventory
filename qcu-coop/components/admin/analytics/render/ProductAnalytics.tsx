"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductSales } from "@/types/analytics/analytics";
import { Search } from "lucide-react";
import { useState } from "react";

type Props = {
  products: ProductSales[];
};

const ProductAnalytics = ({ products }: Props) => {
  const [filter, setFilter] = useState<string>("");
  const filteredTransactions = products?.filter((product) => {
    const productValues = Object.values(product).join(" ").toLowerCase();

    return productValues.includes(filter.toLowerCase());
  });

  return (
    <>
      <Card className="pb-3 shadow-md">
        <CardHeader className="relative mb-6">
          <CardTitle className="font-bold"> TOP PRODUCTS</CardTitle>
          <div className="w-1/2 h-8 absolute top-14 right-4 rounded-md">
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
        </CardHeader>
        <div className="h-72 overflow-y-auto ">
          <CardContent>
            {products?.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="w-fit">
                  {filteredTransactions?.map((product) => (
                    <TableRow key={product.product_id}>
                      <TableCell className="text-center">
                        {product.product_id}
                      </TableCell>
                      <TableCell className="capitalize text-center">
                        {product.product_name}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.sold}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        ₱ {Number(product.revenue).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <h1 className="mt-20 ml-28 font-semibold text-xl">NO TOP PRODUCTS</h1>
            )}
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default ProductAnalytics;
