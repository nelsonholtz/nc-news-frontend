import "../css/commentCard.css";
import { useState } from "react";
// import { CommentVotes } from "./VoteButtons";

function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <h2 className="comment-user">{comment.author}</h2>
      <p>Comment: {comment.body}</p>
      <p>Votes: {comment.votes}</p>
      <p>Created: {comment.created_at}</p>
    </div>
  );
}

export default CommentCard;

{
  /* <CommentVotes commentID={comment.comment_id} /> */
}
