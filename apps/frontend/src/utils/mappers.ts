import { ProductFormData } from "@/lib/validations/product";
import { CreateProductPayload, UpdateProductPayload } from "@/types/product";

export function mapProductFormToPayload(data: ProductFormData): CreateProductPayload {
  return {
    name: data.name,
    imageUrl: data.imageUrl,
    count: data.count,
    size: { width: data.width, height: data.height },
    weight: data.weight,
  };
}

export function mapProductFormToUpdatePayload(data: ProductFormData): UpdateProductPayload {
  return mapProductFormToPayload(data);
}
