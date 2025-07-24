import { deleteArticleIdAPI } from "../api";
import "../css/buttons.css";

const DeleteArticle = ({ articleID, deleteArticle }) => {
  const handleClick = () => {
    deleteArticleIdAPI(articleID)
      .then(() => {
        deleteArticle(articleID);
      })
      .catch((err) => {
        console.error("Delete failed", err);
        alert("Failed to delete article.");
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

export default DeleteArticle;
