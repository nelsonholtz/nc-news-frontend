import { useState, useEffect } from "react";
import { deleteCommentIdAPI, getNCNewsCommentsByID, postComment } from "../api";
import CommentCard from "./CommentCard";
import "../css/addCommentForm.css";

function AddCommentForm({ articleID, loggedInUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("created_at");

  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Fetching comments sorted by ${sortBy} ${order}`);
    getNCNewsCommentsByID(articleID, sortBy, order).then((commentData) => {
      console.log("Received comments:", commentData.comments);
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

    const userToUse = loggedInUser ? loggedInUser.username : username;

    if (!username.trim() && !newComment.trim()) {
      setError("Please enter a username and a comment.");
      return;
    }
    if (!newComment.trim()) {
      setError("Please enter a comment");
      return;
    }

    postComment(articleID, userToUse, newComment)
      .then((newCommentFromApi) => {
        setComments((currentComments) => [
          newCommentFromApi.comment || newCommentFromApi,
          ...currentComments,
        ]);
        setNewComment("");
        if (!loggedInUser) setUsername("");
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

      <div>
        <label>
          Sort votes:
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="desc">Most Votes</option>
            <option value="asc">Least Votes</option>
          </select>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
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
            loggedInUser={loggedInUser}
          />
        ))}
      </ul>
    </section>
  );
}

export default AddCommentForm;
