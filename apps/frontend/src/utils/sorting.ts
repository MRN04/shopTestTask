import { Product, SortOption } from "@/types/product";

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];
  
  if (sortBy === "name") {
    sorted.sort((a, b) => {
      const nameCompare = a.name.localeCompare(b.name);
      return nameCompare === 0 ? b.count - a.count : nameCompare;
    });
  } else {
    sorted.sort((a, b) => {
      const countCompare = b.count - a.count;
      return countCompare === 0 ? a.name.localeCompare(b.name) : countCompare;
    });
  }
  
  return sorted;
}
