
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface Comment {
  author: string;
  text: string;
  timestamp: string;
}

interface TicketCommentsProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  currentUser: string;
  onUpdate?: () => void;
}

export function TicketComments({ comments, onAddComment, currentUser, onUpdate }: TicketCommentsProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate();
      toast.success("Ticket updated successfully");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">{comment.author}</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm">{comment.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="min-h-[80px]"
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={!newComment.trim()}>
            Add Comment
          </Button>
          <Button type="button" variant="secondary" onClick={handleUpdate}>
            Update Ticket
          </Button>
        </div>
      </form>
    </div>
  );
}
