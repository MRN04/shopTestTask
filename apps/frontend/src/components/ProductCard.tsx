"use client";

import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getStockBadgeText, getCommentsText } from "@/utils";
import { ProductDetail } from "./ProductDetail";

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const stockBadgeVariant = product.count > 0 ? "default" : "destructive";

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-56 w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant={stockBadgeVariant} className="shadow-md">
            {getStockBadgeText(product.count)}
          </Badge>
        </div>
      </div>
      <CardContent className="pt-4 pb-3">
        <h3 className="text-lg font-bold mb-3 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <ProductDetail label="Size" value={`${product.size.width}×${product.size.height} cm`} />
          <ProductDetail label="Weight" value={product.weight} />
          <div className="flex items-center gap-1 text-primary pt-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">
              {getCommentsText(product.comments.length)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Link href={`/products/${product.id}`} className="flex-1">
          <Button variant="default" className="w-full shadow-sm hover:shadow-md transition-shadow">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="icon"
          onClick={onDelete}
          className="shadow-sm hover:shadow-md transition-shadow"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
