import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Comment, SortOption } from "@/types/product";

interface ProductsState {
  products: Product[];
  sortBy: SortOption;
}

const initialState: ProductsState = {
  products: [
    {
      id: "1",
      name: "Wireless Mouse",
      imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
      count: 15,
      size: { width: 10, height: 5 },
      weight: "100g",
      comments: [
        {
          id: "c1",
          productId: "1",
          description: "Great product! Very comfortable to use.",
          date: new Date().toISOString(),
        },
      ],
    },
    {
      id: "2",
      name: "Mechanical Keyboard",
      imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
      count: 8,
      size: { width: 45, height: 15 },
      weight: "850g",
      comments: [],
    },
    {
      id: "3",
      name: "HD Webcam",
      imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400",
      count: 12,
      size: { width: 8, height: 6 },
      weight: "150g",
      comments: [],
    },
  ],
  sortBy: "name",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, "id" | "comments">>) => {
      const newProduct: Product = {
        ...action.payload,
        id: Date.now().toString(),
        comments: [],
      };
      state.products.push(newProduct);
    },
    updateProduct: (
      state,
      action: PayloadAction<{ id: string; data: Omit<Product, "id" | "comments"> }>
    ) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...action.payload.data,
        };
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    addComment: (
      state,
      action: PayloadAction<{ productId: string; description: string }>
    ) => {
      const product = state.products.find((p) => p.id === action.payload.productId);
      if (product) {
        const newComment: Comment = {
          id: Date.now().toString(),
          productId: action.payload.productId,
          description: action.payload.description,
          date: new Date().toISOString(),
        };
        product.comments.push(newComment);
      }
    },
    deleteComment: (
      state,
      action: PayloadAction<{ productId: string; commentId: string }>
    ) => {
      const product = state.products.find((p) => p.id === action.payload.productId);
      if (product) {
        product.comments = product.comments.filter(
          (c) => c.id !== action.payload.commentId
        );
      }
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  addComment,
  deleteComment,
  setSortBy,
} = productsSlice.actions;

export default productsSlice.reducer;
