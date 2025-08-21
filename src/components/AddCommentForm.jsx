import { useState, useEffect } from "react";
import { deleteCommentIdAPI, getNCNewsCommentsByID, postComment } from "../api";
import CommentCard from "./CommentCard";
import "../css/addCommentForm.css";
import "../css/buttons.css";

function AddCommentForm({ articleID, loggedInUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("created_at");
  const [error, setError] = useState(null);

  useEffect(() => {
    getNCNewsCommentsByID(articleID, sortBy, order).then((commentData) => {
      setComments(commentData.comments);
    });
  }, [articleID, sortBy, order]);

  useEffect(() => {
    if (loggedInUser) {
      setUsername(loggedInUser.username);
    } else {
      setUsername("");
    }
  }, [loggedInUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      setError(" You must be logged in to post a comment.");
      return;
    }

    if (!newComment.trim()) {
      setError("Please enter a comment");
      return;
    }

    postComment(articleID, loggedInUser.username, newComment)
      .then((newCommentFromApi) => {
        setComments((currentComments) => [
          newCommentFromApi.comment || newCommentFromApi,
          ...currentComments,
        ]);
        setNewComment("");
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

      <div className="sort-controls">
        <div className="sort-select-container">
          <label className="sort-label">Sort by:</label>
          <select
            className="sort-select"
            onChange={(e) => {
              setSortBy(e.target.value);
              setOrder("desc");
            }}
          >
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
          </select>
        </div>

        <div className="sort-select-container">
          <label className="sort-label">Order:</label>
          <select
            className="sort-select"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        {error && <p className="error-message">{error}</p>}

        <textarea
          placeholder="Write your comment here"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
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
            loggedInUser={loggedInUser}
          />
        ))}
      </ul>
    </section>
  );
}

export default AddCommentForm;
