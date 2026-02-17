"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { DeleteProductModal } from "@/components/DeleteProductModal";
import { ProductsToolbar } from "@/components/ProductsToolbar";
import { Button } from "@/components/ui/button";
import { Plus, Package, Loader2 } from "lucide-react";
import { ProductFormData } from "@/lib/validations/product";
import { SortOption } from "@/types/product";
import { useGetProducts } from "@/api/services/queries";
import { useCreateProduct, useDeleteProduct } from "@/api/services/mutations";

export function ProductsListView() {
  const { data: products = [], isLoading, error } = useGetProducts();
  const createProductMutation = useCreateProduct();
  const deleteProductMutation = useDeleteProduct();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("name");

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

  const handleAddProduct = async (data: ProductFormData) => {
    await createProductMutation.mutateAsync({
      name: data.name,
      imageUrl: data.imageUrl,
      count: data.count,
      size: { width: data.width, height: data.height },
      weight: data.weight,
    });
  };

  const handleDeleteClick = (id: string, name: string) => {
    setProductToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      await deleteProductMutation.mutateAsync(productToDelete.id);
      setProductToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error loading products</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8">
        <ProductsToolbar
          sortBy={sortBy}
          onSortChange={setSortBy}
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
