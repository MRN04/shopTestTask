export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  productId: string;
  description: string;
  date: string;
}

export type SortOption = 'name' | 'count';

// Type for creating a new product (without id and comments)
export type CreateProductPayload = Omit<Product, 'id' | 'comments'>;

// Type for updating a product (without id and comments, all fields optional)
export type UpdateProductPayload = Partial<CreateProductPayload>;

// Type for creating a new comment (without id, productId, and date)
export type CreateCommentPayload = Pick<Comment, 'description'>;
