import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="text-center py-24">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted/50 mb-6">
        <Package className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
        {description}
      </p>
      {onAction && actionLabel && (
        <Button onClick={onAction} size="lg" className="shadow-lg">
          <Plus className="mr-2 h-5 w-5" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
