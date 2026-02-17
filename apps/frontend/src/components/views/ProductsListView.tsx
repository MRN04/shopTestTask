"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ProductsToolbar } from "@/components/ProductsToolbar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { ProductFormData } from "@/lib/validations/product";
import { SortOption } from "@/types/product";
import { useGetProducts } from "@/api/services/queries";
import { useCreateProduct, useDeleteProduct } from "@/api/services/mutations";
import { sortProducts, mapProductFormToPayload } from "@/utils";
import { API_CONFIG } from "@/config";

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

  const sortedProducts = useMemo(
    () => sortProducts(products, sortBy),
    [products, sortBy]
  );

  const handleAddProduct = async (data: ProductFormData) => {
    await createProductMutation.mutateAsync(mapProductFormToPayload(data));
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

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <ErrorState
        title="Error loading products"
        message={error.message || `Please make sure the backend server is running on ${API_CONFIG.BASE_URL}`}
        action={{ label: "Retry", onClick: () => window.location.reload() }}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 lg:px-8">
        <ProductsToolbar
          sortBy={sortBy}
          onSortChange={setSortBy}
          onAddProduct={() => setIsAddModalOpen(true)}
          productsCount={sortedProducts.length}
        />

        {sortedProducts.length === 0 ? (
          <EmptyState
            title="No products yet"
            description="Get started by adding your first product to the inventory."
            actionLabel="Add Your First Product"
            onAction={() => setIsAddModalOpen(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={() => handleDeleteClick(product.id, product.name)}
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
        <ConfirmDialog
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirm={handleDeleteConfirm}
          title="Delete Product"
          description={`Are you sure you want to delete "${productToDelete.name}"? This action cannot be undone.`}
          confirmLabel="Delete"
          isLoading={deleteProductMutation.isPending}
        />
      )}
    </div>
  );
}
