import { endpoints } from "../endpoints";
import { fetchClient } from "../fetch.config";
import { Product, CreateProductPayload, UpdateProductPayload, CreateCommentPayload } from "@/types/product";
import { API_CONFIG } from "@/config";

export class Services {
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }
    
    return response.json();
  }

  public static async getProducts() {
    const response = await fetchClient(endpoints.products.getAll, {
      next: { revalidate: API_CONFIG.REVALIDATE_TIME },
    });
    return this.handleResponse<Product[]>(response);
  }

  public static async getProductById(id: string) {
    const response = await fetchClient(endpoints.products.getById(id), {
      next: { revalidate: API_CONFIG.REVALIDATE_TIME },
    });
    return this.handleResponse<Product>(response);
  }

  public static async createProduct(product: CreateProductPayload) {
    const response = await fetchClient(endpoints.products.create, {
      method: 'POST',
      body: JSON.stringify(product),
    });
    return this.handleResponse<Product>(response);
  }

  public static async updateProduct(id: string, product: UpdateProductPayload) {
    const response = await fetchClient(endpoints.products.update(id), {
      method: 'PUT',
      body: JSON.stringify(product),
    });
    return this.handleResponse<Product>(response);
  }

  public static async deleteProduct(id: string) {
    const response = await fetchClient(endpoints.products.delete(id), {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete product`);
    }
    
    return true;
  }

  public static async addComment(id: string, comment: CreateCommentPayload) {
    const response = await fetchClient(endpoints.products.addComment(id), {
      method: 'POST',
      body: JSON.stringify(comment),
    });
    return this.handleResponse<Product>(response);
  }

  public static async deleteComment(id: string, commentId: string) {
    const response = await fetchClient(endpoints.products.deleteComment(id, commentId), {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete comment`);
    }
    
    return true;
  }
}
