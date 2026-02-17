"use client";

import { useMediaQuery } from "./useMediaQuery";

export function useItemsPerPage() {
  const isXl = useMediaQuery("(min-width: 1280px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 768px)");

  if (isXl) return 12;
  if (isLg) return 9;
  if (isMd) return 8;
  return 6;
}
