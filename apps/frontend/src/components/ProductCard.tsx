"use client";

import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
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
          <Badge 
            variant={product.count > 0 ? "default" : "destructive"}
            className="shadow-md"
          >
            {product.count > 0 ? `${product.count} in stock` : "Out of stock"}
          </Badge>
        </div>
      </div>
      <CardContent className="pt-4 pb-3">
        <h3 className="text-lg font-bold mb-3 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span className="font-medium">Size:</span>
              <span>{product.size.width}×{product.size.height} cm</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span className="font-medium">Weight:</span>
              <span>{product.weight}</span>
            </span>
          </div>
          {product.comments.length > 0 ? (
            <div className="flex items-center gap-1 text-primary pt-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">
                {product.comments.length} {product.comments.length === 1 ? "comment" : "comments"}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-primary pt-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">No comments yet</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0 ">
        <Link href={`/products/${product.id}`} className="flex-1">
          <Button variant="default" className="w-full shadow-sm hover:shadow-md transition-shadow">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(product.id)}
          className="shadow-sm hover:shadow-md transition-shadow"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
