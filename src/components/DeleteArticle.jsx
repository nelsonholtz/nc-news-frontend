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
    <button className="delete-button" onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeleteArticle;
