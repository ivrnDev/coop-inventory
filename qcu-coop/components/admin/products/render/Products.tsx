import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductsType } from "@/types/products/products";
import Image from "next/image";

type Props = {
  products: ProductsType[];
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
          products.map((product) => (
            <TableRow key={product.id} className="">
              <TableCell>
                <Image
                  src={`data:image/png;base64,${product.display_image}`}
                  alt={product.product_name}
                  width="70"
                  height="70"
                ></Image>
              </TableCell>
              <TableCell>{product.product_id}</TableCell>
              <TableCell>{product.product_name}</TableCell>
              <TableCell>{product.category_name}</TableCell>
              <TableCell>
                {product.product_stocks}
              </TableCell>
              <TableCell>
                ${product.display_price}
              </TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>
                {product.isFeatured === 1 ? "Yes" : "No"}
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
