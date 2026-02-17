"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, SlidersHorizontal } from "lucide-react";
import { SortOption } from "@/types/product";

interface ProductsToolbarProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  onAddProduct: () => void;
  productsCount: number;
}

export function ProductsToolbar({
  sortBy,
  onSortChange,
  onAddProduct,
  productsCount,
}: ProductsToolbarProps) {
  return (
    <div className="border-b mb-10 mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-base font-semibold">
              {productsCount} {productsCount === 1 ? "Product" : "Products"}
            </span>
          </div>
          <div className="h-5 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Sort by
            </span>
            <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
              <SelectTrigger className="w-[170px] h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="count">Stock Count</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={onAddProduct}
          size="lg"
          className="shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Product
        </Button>
      </div>
    </div>
  );
}
