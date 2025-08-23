import { useState } from "react";
import { deleteCommentIdAPI } from "../api";
import "../css/buttons.css";

const DeleteComment = ({ commentID, deleteComment }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteCommentIdAPI(commentID)
      .then(() => {
        deleteComment(commentID);
        setShowConfirm(false);
      })
      .catch((err) => {
        console.error("Delete failed", err);
        alert("Failed to delete comment.");
      });
  };

  return (
    <>
      <div className="delete-button-container">
        <button className="delete-button" onClick={() => setShowConfirm(true)}>
          Delete
        </button>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this comment?</p>
            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button className="confirm-button" onClick={handleDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteComment;
