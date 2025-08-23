import { CommentVotes } from "./VoteButtons";
import DeleteComment from "./DeleteComment";
import FormattedDate from "./FormattedDate";
import { useState, useEffect } from "react";
import { fetchUserByUsername } from "../api";
import "../css/commentCard.css";

function CommentCard({ comment, deleteComment, loggedInUser }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!comment.author) return;

    fetchUserByUsername(comment.author)
      .then((data) => {
        setAvatarUrl(data.user.avatar_url);
      })
      .catch((err) => {
        console.error("Failed to fetch avatar", err);
        setError(err);
      });
  }, [comment.author]);

  return (
    <div className="comment-card">
      <div className="comment-header">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={`${comment.author}'s avatar`}
            className="avatar"
          />
        )}
        <h2 className="comment-user">{comment.author}</h2>
      </div>

      <p>Comment: {comment.body}</p>
      <p>
        Created: <FormattedDate dateString={comment.created_at} />
      </p>

      <div className="vote-and-delete">
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
    </div>
  );
}

export default CommentCard;
