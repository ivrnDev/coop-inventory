import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/products/products";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
};

const AdminRenderProducts = ({ products }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product Image</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stocks</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Featured</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>
                <Image
                  src={`data:image/png;base64,${product.display_image}`}
                  alt={product.product_name}
                  width="70"
                  height="70"
                />
              </TableCell>
              <TableCell>{product.product_id}</TableCell>
              <TableCell>{product.product_name}</TableCell>
              <TableCell>{product.category_name}</TableCell>
              <TableCell>{product.product_stocks}</TableCell>
              <TableCell>${product.display_price}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>{product.isFeatured === 1 ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button type="button" variant="destructive">
                  DELETE
                </Button>
              </TableCell>
              <TableCell>
                <Button type="button" variant="submit">
                  <Link
                    href={`./products/update/${product.product_name.toLowerCase()}?${new URLSearchParams(
                      {
                        id: String(product.product_id),
                      }
                    )}
                  `}
                  >
                    EDIT
                  </Link>
                </Button>
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
  );
};

export default AdminRenderProducts;
