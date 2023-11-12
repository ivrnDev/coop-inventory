"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getVariantByProductId } from "@/lib/api/variants";

import { Products, Variant } from "@/types/products/products";
import classNames from "classnames";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  products: Products[] | undefined | null;
};

const CreateTransactions = ({ products }: Props) => {
  const [openProduct, setOpenProduct] = useState<boolean>(false);
  const [valueProduct, setValueProduct] = useState<string>("");
  const [searchInputProduct, setSearchInputProduct] = useState<string>("");

  const [variants, setVariants] = useState<Variant[]>([]);
  const [openVariant, setOpenVariant] = useState<boolean>(false);
  const [valueVariant, setValueVariant] = useState<string>("");
  const [searchInputVariant, setSearchInputVariant] = useState<string>("");

  const selectedProduct = products?.find(
    (product) => String(product.product_id) === valueProduct
  );

  const filteredProducts = products?.filter((product) =>
    product.product_name
      .toLowerCase()
      .includes(searchInputProduct.toLowerCase())
  );

  useEffect(() => {
    const getVariant = async () => {
      const result = await getVariantByProductId(valueProduct);
      if (!result) return;
      setVariants(result);
    };
    getVariant();
  }, [valueProduct]);

  const selectedVariant = variants.find(
    (variant) => String(variant.variant_id) === valueVariant
  );

  const filteredVariants = variants.filter((variant) =>
    variant.variant_name
      .toLowerCase()
      .includes(searchInputVariant.toLowerCase())
  );

  return (
    <>
      <Popover open={openProduct} onOpenChange={setOpenProduct}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openProduct}
            className="w-[200px] justify-between"
          >
            {selectedProduct
              ? selectedProduct.product_name
              : "Select product..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <Input
              type="text"
              placeholder="Search product..."
              value={searchInputProduct}
              onChange={(e) => setSearchInputProduct(e.target.value)}
            />
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              {filteredProducts?.map((product) => (
                <CommandItem
                  key={product.product_id}
                  value={String(product.product_id)}
                  onSelect={(currentValue) => {
                    setValueProduct(
                      currentValue === valueProduct ? "" : currentValue
                    );
                    setOpenProduct(false);
                  }}
                >
                  <Check
                    className={classNames(
                      "mr-2 h-4 w-4",
                      valueProduct === String(product.product_id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {product.product_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Variant Dropdown */}
      <Popover open={openVariant} onOpenChange={setOpenVariant}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openVariant}
            className="w-[200px] justify-between"
          >
            {selectedVariant
              ? selectedVariant.variant_name
              : "Select variant..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <Input
              type="text"
              placeholder="Search variant..."
              value={searchInputVariant}
              onChange={(e) => setSearchInputVariant(e.target.value)}
            />
            <CommandEmpty>No variant found.</CommandEmpty>
            <CommandGroup>
              {filteredVariants?.map((variant) => (
                <CommandItem
                  key={variant.variant_id}
                  value={String(variant.variant_id)}
                  onSelect={(currentValue) => {
                    setValueVariant(
                      currentValue === valueVariant ? "" : currentValue
                    );
                    setOpenVariant(false);
                  }}
                >
                  <Check
                    className={classNames(
                      "mr-2 h-4 w-4",
                      valueVariant === String(variant.variant_id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {variant.variant_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CreateTransactions;
