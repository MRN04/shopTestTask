import { MessageSquare } from "lucide-react";

export function EmptyCommentsState() {
  return (
    <div className="text-center py-12 border-2 border-dashed rounded-lg">
      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-lg text-muted-foreground mb-2">No comments yet</p>
      <p className="text-sm text-muted-foreground">
        Be the first to share your thoughts!
      </p>
    </div>
  );
}
