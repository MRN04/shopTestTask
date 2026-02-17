import { Product } from "@/types/product";
import { Services } from "./services";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { QUERY_CONFIG } from "@/config";
import { toast } from "sonner";

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: () => Services.getProducts(),
    retry: QUERY_CONFIG.RETRY_COUNT,
    meta: {
      onError: (error: any) => {
        toast.error(error?.message || "Failed to load products");
      },
    },
  });
}

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: () => Services.getProductById(id),
    retry: QUERY_CONFIG.RETRY_COUNT,
    meta: {
      onError: (error: any) => {
        toast.error(error?.message || "Failed to load product");
      },
    },
  });
}
