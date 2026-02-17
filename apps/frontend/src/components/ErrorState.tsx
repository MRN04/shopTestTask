import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { ReactNode } from "react";

interface ErrorStateProps {
  title: string;
  message: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function ErrorState({ title, message, icon, action }: ErrorStateProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-4">
          {icon || <Package className="h-10 w-10 text-destructive" />}
        </div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground max-w-md mx-auto">{message}</p>
        {action && (
          <Button onClick={action.onClick} variant="outline">
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
