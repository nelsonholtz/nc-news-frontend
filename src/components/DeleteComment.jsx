import { deleteCommentIdAPI } from "../api";

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

  return <button onClick={handleClick}>Delete Comment</button>;
};

export default DeleteComment;
