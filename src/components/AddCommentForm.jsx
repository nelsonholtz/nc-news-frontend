import { useState, useEffect } from "react";
import { deleteCommentIdAPI, getNCNewsCommentsByID, postComment } from "../api";
import CommentCard from "./CommentCard";
import "../css/addCommentForm.css";

function AddCommentForm({ articleID }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getNCNewsCommentsByID(articleID).then((commentData) => {
      setComments(commentData.comments);
    });
  }, [articleID]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !newComment.trim()) {
      setError("Please enter a username and a comment.");
      return;
    }

    postComment(articleID, username, newComment)
      .then((newCommentFromApi) => {
        console.log("New comment:", newCommentFromApi);
        setComments((currentComments) => [
          newCommentFromApi.comment || newCommentFromApi,
          ...currentComments,
        ]);
        setNewComment("");
        setUsername("");
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to post comment");
      });
  };

  const handleDeleteComment = (deleteCommentID) => {
    setComments((currentComment) =>
      currentComment.filter((comment) => comment.comment_id !== deleteCommentID)
    );
  };

  return (
    <section className="comment-section">
      <h2 className="comment-title">Comments</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="comment-input"
        />
        <textarea
          placeholder="Write your comment here"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          className="comment-textarea"
        />
        <button type="submit" className="comment-submit-btn">
          Post Comment
        </button>
      </form>

      <ul className="comment-list">
        {comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            deleteComment={handleDeleteComment}
          />
        ))}
      </ul>
    </section>
  );
}

export default AddCommentForm;
