import { useState } from "react";
import { deleteArticleIdAPI } from "../api";
import "../css/buttons.css";

const DeleteArticle = ({ articleID, deleteArticle }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteArticleIdAPI(articleID)
      .then(() => {
        deleteArticle(articleID);
        setShowConfirm(false);
      })
      .catch((err) => {
        console.error("Delete failed", err);
        alert("Failed to delete article.");
      });
  };

  return (
    <>
      <button className="delete-button" onClick={() => setShowConfirm(true)}>
        Delete
      </button>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this post?</p>
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

export default DeleteArticle;
