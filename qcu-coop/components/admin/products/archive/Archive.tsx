import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import { getDeletedProducts } from "@/lib/api/products";
import { DeletedProducts } from "@/types/products/products";
import { Dialog } from "@radix-ui/react-dialog";
import DeleteButton from "../buttons/DeleteButton";
import { rolePermissions } from "@/lib/permission";
import RestoreButton from "../buttons/Restore";

const TrashArchive = async () => {
  const { restricted } = rolePermissions;
  const deletedProducts: DeletedProducts[] = await getDeletedProducts();
  return (
    <>
      <Dialog>
        <DialogTrigger>TRASH</DialogTrigger>
        <DialogContent>
          <Table>
            <TableHeader>
              <TableHead>Product ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Stocks</TableHead>
            </TableHeader>
            <TableBody>
              {deletedProducts?.length > 0 &&
                deletedProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.product_id}</TableCell>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>{product.product_stocks}</TableCell>
                    <TableCell>
                      {
                        <RestoreButton
                          roles={restricted}
                          target={{
                            id: product.product_id,
                            object: product.product_name,
                            target: "product",
                          }}
                          message={{
                            success: `Sucessfully restore ${product.product_name} product`,
                            failed: `Failed to restore ${product.product_name} product`,
                          }}
                          deleteTarget="deleteProduct"
                          isDeleted="0"
                        />
                      }
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrashArchive;
