import "../css/commentCard.css";
import { CommentVotes } from "./VoteButtons";
import DeleteComment from "./DeleteComment";

function CommentCard({ comment, deleteComment }) {
  return (
    <div className="comment-card">
      <h2 className="comment-user">{comment.author}</h2>
      <p>Comment: {comment.body}</p>
      <p>Created: {comment.created_at}</p>
      <CommentVotes
        commentID={comment.comment_id}
        initialVotes={comment.votes}
      />
      <DeleteComment
        commentID={comment.comment_id}
        deleteComment={deleteComment}
      />
    </div>
  );
}

export default CommentCard;
