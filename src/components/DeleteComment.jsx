import { deleteCommentIdAPI } from "../api";
import "../css/buttons.css";

const DeleteComment = ({ commentID, deleteComment }) => {
  const handleClick = () => {
    deleteCommentIdAPI(commentID)
      .then(() => {
        deleteComment(commentID);
      })
      .catch((err) => {
        console.error("Delete failed", err);
        alert("Failed to delete comment.");
      });
  };

  return (
    <div className="delete-button-container">
      <button className="delete-button" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
};

export default DeleteComment;
