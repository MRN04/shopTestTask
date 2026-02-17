"use client";

import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  addProduct,
  deleteProduct,
  setSortBy,
} from "@/store/productsSlice";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { DeleteProductModal } from "@/components/DeleteProductModal";
import { ProductsToolbar } from "@/components/ProductsToolbar";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { ProductFormData } from "@/lib/validations/product";
import { SortOption } from "@/types/product";

export function ProductsListView() {
  const dispatch = useDispatch();
  const { products, sortBy } = useSelector((state: RootState) => state.products);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sortBy === "name") {
      sorted.sort((a, b) => {
        const nameCompare = a.name.localeCompare(b.name);
        if (nameCompare === 0) {
          return b.count - a.count;
        }
        return nameCompare;
      });
    } else {
      sorted.sort((a, b) => {
        const countCompare = b.count - a.count;
        if (countCompare === 0) {
          return a.name.localeCompare(b.name);
        }
        return countCompare;
      });
    }
    return sorted;
  }, [products, sortBy]);

  const handleAddProduct = (data: ProductFormData) => {
    dispatch(
      addProduct({
        name: data.name,
        imageUrl: data.imageUrl,
        count: data.count,
        size: { width: data.width, height: data.height },
        weight: data.weight,
      })
    );
  };

  const handleDeleteClick = (id: string, name: string) => {
    setProductToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id));
      setProductToDelete(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8">
        <ProductsToolbar
          sortBy={sortBy}
          onSortChange={(value) => dispatch(setSortBy(value))}
          onAddProduct={() => setIsAddModalOpen(true)}
          productsCount={sortedProducts.length}
        />

        {sortedProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted/50 mb-6">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-3">No products yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
              Get started by adding your first product to the inventory.
            </p>
            <Button onClick={() => setIsAddModalOpen(true)} size="lg" className="shadow-lg">
              <Plus className="mr-2 h-5 w-5" />
              Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={(id) =>
                  handleDeleteClick(id, product.name)
                }
              />
            ))}
          </div>
        )}
      </div>

      <AddProductModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddProduct}
      />

      {productToDelete && (
        <DeleteProductModal
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirm={handleDeleteConfirm}
          productName={productToDelete.name}
        />
      )}
    </div>
  );
}
