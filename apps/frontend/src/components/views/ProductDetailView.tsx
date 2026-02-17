"use client";

import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateProduct, addComment, deleteComment } from "@/store/productsSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditProductModal } from "@/components/EditProductModal";
import { ArrowLeft, Edit, MessageSquare, Trash2, Package, Calendar } from "lucide-react";
import { ProductFormData } from "@/lib/validations/product";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, CommentFormData } from "@/lib/validations/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductDetailViewProps {
  productId: string;
}

export function ProductDetailView({ productId }: ProductDetailViewProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === productId)
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const sortedComments = useMemo(() => {
    if (!product) return [];
    return [...product.comments].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Product not found</h1>
          <p className="text-muted-foreground">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button onClick={() => router.push("/")} size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleEditProduct = (data: ProductFormData) => {
    dispatch(
      updateProduct({
        id: productId,
        data: {
          name: data.name,
          imageUrl: data.imageUrl,
          count: data.count,
          size: { width: data.width, height: data.height },
          weight: data.weight,
        },
      })
    );
  };

  const handleAddComment = (data: CommentFormData) => {
    dispatch(
      addComment({
        productId,
        description: data.description,
      })
    );
    reset();
  };

  const handleDeleteCommentClick = (commentId: string) => {
    setCommentToDelete(commentId);
    setIsDeleteCommentModalOpen(true);
  };

  const handleDeleteCommentConfirm = () => {
    if (commentToDelete) {
      dispatch(deleteComment({ productId, commentId: commentToDelete }));
      setCommentToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
        <div className="space-y-4">
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-[500px] w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-4xl mb-2">{product.name}</CardTitle>
                  <Badge
                    variant={product.count > 0 ? "default" : "destructive"}
                    className="text-sm py-1 px-3"
                  >
                    {product.count > 0 ? `${product.count} in stock` : "Out of stock"}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditModalOpen(true)}
                  className="shrink-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Dimensions
                  </h3>
                  <p className="text-2xl font-semibold">
                    {product.size.width} × {product.size.height} cm
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Weight
                  </h3>
                  <p className="text-2xl font-semibold">{product.weight}</p>
                </div>
              </div>

              {product.comments.length > 0 && (
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm">
                      {product.comments.length} {product.comments.length === 1 ? "comment" : "comments"}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <MessageSquare className="h-6 w-6" />
            Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleAddComment)}
            className="mb-8 space-y-3"
          >
            <Textarea
              placeholder="Share your thoughts about this product..."
              {...register("description")}
              className="min-h-[120px] resize-none"
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
            <Button type="submit" size="lg">
              <MessageSquare className="mr-2 h-4 w-4" />
              Post Comment
            </Button>
          </form>

          <div className="space-y-4">
            {sortedComments.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-2">No comments yet</p>
                <p className="text-sm text-muted-foreground">
                  Be the first to share your thoughts!
                </p>
              </div>
            ) : (
              sortedComments.map((comment) => (
                <Card key={comment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(comment.date)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-destructive/10"
                        onClick={() => handleDeleteCommentClick(comment.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <p className="text-base leading-relaxed">{comment.description}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {isEditModalOpen && (
        <EditProductModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSubmit={handleEditProduct}
          product={product}
        />
      )}

      <Dialog
        open={isDeleteCommentModalOpen}
        onOpenChange={setIsDeleteCommentModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteCommentModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleDeleteCommentConfirm();
                setIsDeleteCommentModalOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
