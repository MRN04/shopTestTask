import { endpoints } from "../endpoints";
import { fetchClient } from "../fetch.config";
import { Product, CreateProductPayload, UpdateProductPayload, CreateCommentPayload } from "@/types/product";

export class Services {
  public static async getProducts() {
    const response = await fetchClient(endpoints.products.getAll, {
      next: { revalidate: 60},
    });
    const data: Product[] = await response.json();
    return data;
  }

  public static async getProductById(id: string) {
    const response = await fetchClient(endpoints.products.getById(id), {
      next: { revalidate: 60},
    });
    const data: Product = await response.json();
    return data;
  }

  public static async createProduct(product: CreateProductPayload) {
    const response = await fetchClient(endpoints.products.create, {
      method: 'POST',
      body: JSON.stringify(product),
    });
    const data: Product = await response.json();
    return data;
  }

  public static async updateProduct(id: string, product: UpdateProductPayload) {
    const response = await fetchClient(endpoints.products.update(id), {
      method: 'PUT',
      body: JSON.stringify(product),
    });
    const data: Product = await response.json();
    return data;
  }

  public static async deleteProduct(id: string) {
    const response = await fetchClient(endpoints.products.delete(id), {
      method: 'DELETE',
    });
    return response.ok;
  }

  public static async addComment(id: string, comment: CreateCommentPayload) {
    const response = await fetchClient(endpoints.products.addComment(id), {
      method: 'POST',
      body: JSON.stringify(comment),
    });
    const data: Product = await response.json();
    return data;
  }

  public static async deleteComment(id: string, commentId: string) {
    const response = await fetchClient(endpoints.products.deleteComment(id, commentId), {
      method: 'DELETE',
    });
    return response.ok;
  }
}