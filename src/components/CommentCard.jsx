import "../css/commentCard.css";
import { CommentVotes } from "./VoteButtons";
import DeleteComment from "./DeleteComment";
import FormattedDate from "./FormattedDate";

function CommentCard({ comment, deleteComment, loggedInUser }) {
  return (
    <div className="comment-card">
      <h2 className="comment-user">{comment.author}</h2>
      <p>Comment: {comment.body}</p>
      <p>
        Created: <FormattedDate dateString={comment.created_at} />
      </p>
      <CommentVotes
        commentID={comment.comment_id}
        initialVotes={comment.votes}
      />
      {loggedInUser && loggedInUser.username === comment.author && (
        <DeleteComment
          commentID={comment.comment_id}
          deleteComment={deleteComment}
        />
      )}
    </div>
  );
}

export default CommentCard;
