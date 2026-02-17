import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100, "Name is too long"),
  imageUrl: z.string().url("Please enter a valid URL").min(1, "Image URL is required"),
  count: z.number().int().min(0, "Count must be at least 0"),
  width: z.number().positive("Width must be positive"),
  height: z.number().positive("Height must be positive"),
  weight: z.string().min(1, "Weight is required"),
});

export const commentSchema = z.object({
  description: z.string().min(1, "Comment cannot be empty").max(500, "Comment is too long"),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type CommentFormData = z.infer<typeof commentSchema>;
