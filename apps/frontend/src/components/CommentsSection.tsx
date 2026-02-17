"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { commentSchema, CommentFormData } from "@/lib/validations/product";
import { Comment } from "@/types/product";
import { CommentForm } from "./CommentForm";
import { EmptyCommentsState } from "./EmptyCommentsState";
import { CommentItem } from "./CommentItem";

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (data: CommentFormData) => Promise<void>;
  onDeleteComment: (commentId: string) => void;
  isAddingComment: boolean;
  isDeletingComment: boolean;
}

export function CommentsSection({
  comments,
  onAddComment,
  onDeleteComment,
  isAddingComment,
  isDeletingComment,
}: CommentsSectionProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const handleSubmitComment = async (data: CommentFormData) => {
    await onAddComment(data);
    reset();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MessageSquare className="h-6 w-6" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CommentForm
          onSubmit={handleSubmitComment}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isAddingComment}
        />

        <div className="space-y-4">
          {comments.length === 0 ? (
            <EmptyCommentsState />
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onDelete={onDeleteComment}
                isDeleting={isDeletingComment}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
