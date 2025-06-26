import { useState, useEffect } from "react";
import { getNCNewsCommentsByID, postComment } from "../api";
import CommentCard from "./CommentCard";

function AddCommentForm({ articleID }) {
  const [comments, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getNCNewsCommentsByID(articleID).then((commentData) => {
      console.log("API Response:", commentData);
      setComment(commentData.comments);
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
        setComment((currentComments) => [
          newCommentFromApi,
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

  return (
    <section>
      <h2>Comment Adder</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your comment here"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Post Comment</button>
      </form>

      <ul>
        {comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))}
      </ul>
    </section>
  );
}

export default AddCommentForm;
