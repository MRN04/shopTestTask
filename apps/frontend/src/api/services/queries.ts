import { Product } from "@/types/product";
import { Services } from "./services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: () => Services.getProducts(),
  });
}

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: () => Services.getProductById(id),
  });
}
