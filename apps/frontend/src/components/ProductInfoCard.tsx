import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, MessageSquare } from "lucide-react";
import { Product } from "@/types/product";
import { getStockBadgeText, getCommentsText } from "@/utils";
import { ProductSpec } from "./ProductSpec";

interface ProductInfoCardProps {
  product: Product;
  onEdit: () => void;
  isEditDisabled: boolean;
}

export function ProductInfoCard({ product, onEdit, isEditDisabled }: ProductInfoCardProps) {
  const stockBadgeVariant = product.count > 0 ? "default" : "destructive";

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-4xl mb-2">{product.name}</CardTitle>
            <Badge variant={stockBadgeVariant} className="text-sm py-1 px-3">
              {getStockBadgeText(product.count)}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onEdit}
            className="shrink-0"
            disabled={isEditDisabled}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <ProductSpec
            label="Dimensions"
            value={`${product.size.width} × ${product.size.height} cm`}
          />
          <ProductSpec label="Weight" value={product.weight} />
        </div>

        {product.comments.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">{getCommentsText(product.comments.length)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
