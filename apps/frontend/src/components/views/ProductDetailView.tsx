"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EditProductModal } from "@/components/EditProductModal";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorState } from "@/components/ErrorState";
import { ProductImage } from "@/components/ProductImage";
import { ProductInfoCard } from "@/components/ProductInfoCard";
import { CommentsSection } from "@/components/CommentsSection";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ArrowLeft } from "lucide-react";
import { ProductFormData, CommentFormData } from "@/lib/validations/product";
import { useGetProductById } from "@/api/services/queries";
import { useAddComment, useDeleteComment, useUpdateProduct } from "@/api/services/mutations";
import { sortByDateDesc, mapProductFormToUpdatePayload } from "@/utils";

interface ProductDetailViewProps {
  productId: string;
}

export function ProductDetailView({ productId }: ProductDetailViewProps) {
  const router = useRouter();
  
  const { data: product, isLoading, error } = useGetProductById(productId);
  const updateProductMutation = useUpdateProduct();
  const addCommentMutation = useAddComment();
  const deleteCommentMutation = useDeleteComment();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const sortedComments = useMemo(() => {
    if (!product) return [];
    return sortByDateDesc(product.comments);
  }, [product]);

  const handleEditProduct = async (data: ProductFormData) => {
    await updateProductMutation.mutateAsync({
      id: productId,
      product: mapProductFormToUpdatePayload(data),
    });
    setIsEditModalOpen(false);
  };

  const handleAddComment = async (data: CommentFormData) => {
    await addCommentMutation.mutateAsync({
      id: productId,
      comment: { description: data.description },
    });
  };

  const handleDeleteCommentClick = (commentId: string) => {
    setCommentToDelete(commentId);
    setIsDeleteCommentModalOpen(true);
  };

  const handleDeleteCommentConfirm = async () => {
    if (commentToDelete) {
      await deleteCommentMutation.mutateAsync({
        id: productId,
        commentId: commentToDelete,
      });
      setCommentToDelete(null);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <ErrorState
        title="Product not found"
        message="The product you're looking for doesn't exist or has been removed."
        action={{
          label: "Back to Products",
          onClick: () => router.push("/"),
        }}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.push("/")}
        className="mb-8 hover:bg-accent"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductImage
          imageUrl={product.imageUrl}
          alt={product.name}
          height={500}
          priority
        />

        <ProductInfoCard
          product={product}
          onEdit={() => setIsEditModalOpen(true)}
          isEditDisabled={updateProductMutation.isPending}
        />
      </div>

      <CommentsSection
        comments={sortedComments}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteCommentClick}
        isAddingComment={addCommentMutation.isPending}
        isDeletingComment={deleteCommentMutation.isPending}
      />

      {isEditModalOpen && (
        <EditProductModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSubmit={handleEditProduct}
          product={product}
        />
      )}

      <ConfirmDialog
        open={isDeleteCommentModalOpen}
        onOpenChange={setIsDeleteCommentModalOpen}
        onConfirm={handleDeleteCommentConfirm}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        confirmLabel="Delete"
        isLoading={deleteCommentMutation.isPending}
      />
    </div>
  );
}
