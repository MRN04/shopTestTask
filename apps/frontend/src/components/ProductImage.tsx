import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface ProductImageProps {
  imageUrl: string;
  alt: string;
  height?: number;
  priority?: boolean;
}

export function ProductImage({ 
  imageUrl, 
  alt, 
  height = 500, 
  priority = false 
}: ProductImageProps) {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div 
          className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
          style={{ height: `${height}px` }}
        >
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={priority}
          />
        </div>
      </CardContent>
    </Card>
  );
}
