export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

export function getStockBadgeText(count: number): string {
  return count > 0 ? `${count} in stock` : "Out of stock";
}

export function getCommentsText(count: number): string {
  if (count === 0) return "No comments yet";
  return `${count} ${pluralize(count, "comment", "comments")}`;
}

export function getProductsCountText(count: number): string {
  return `${count} ${pluralize(count, "Product", "Products")}`;
}
