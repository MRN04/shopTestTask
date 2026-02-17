import { CreateProductPayload, UpdateProductPayload, CreateCommentPayload } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Services } from "./services";
import { QUERY_KEYS } from "../constants";
import { toast } from "sonner";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (product: CreateProductPayload) => Services.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      toast.success("Product created successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create product");
    },
  });
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: UpdateProductPayload }) => 
      Services.updateProduct(id, product),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT, variables.id] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      toast.success("Product updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update product");
    },
  });
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => Services.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      toast.success("Product deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete product");
    },
  });
}

export const useAddComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: CreateCommentPayload }) => Services.addComment(id, comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT, variables.id] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      toast.success("Comment added successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to add comment");
    },
  });
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, commentId }: { id: string; commentId: string }) => Services.deleteComment(id, commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT, variables.id] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      toast.success("Comment deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete comment");
    },
  });
}
