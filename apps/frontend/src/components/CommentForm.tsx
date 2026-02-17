import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Loader2 } from "lucide-react";
import { CommentFormData } from "@/lib/validations/product";

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  register: any;
  handleSubmit: any;
  errors: any;
  isSubmitting: boolean;
}

export function CommentForm({ onSubmit, register, handleSubmit, errors, isSubmitting }: CommentFormProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-3">
      <Textarea
        placeholder="Share your thoughts about this product..."
        {...register("description")}
        className="min-h-[120px] resize-none"
      />
      {errors.description && (
        <p className="text-sm text-destructive">{errors.description.message}</p>
      )}
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <MessageSquare className="mr-2 h-4 w-4" />
            Post Comment
          </>
        )}
      </Button>
    </form>
  );
}
