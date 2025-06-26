import "../css/commentCard.css";
import { useState } from "react";
import { CommentVotes } from "./VoteButtons";

function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <h2 className="comment-user">{comment.author}</h2>
      <p>Comment: {comment.body}</p>
      <p>Created: {comment.created_at}</p>
      <CommentVotes
        commentID={comment.comment_id}
        initialVotes={comment.votes}
      />
    </div>
  );
}

export default CommentCard;
