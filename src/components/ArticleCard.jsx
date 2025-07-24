import "../css/articleCard.css";
import { useState } from "react";
import { LikesCounter } from "../components/VoteButtons";
import AddCommentForm from "./AddCommentForm";
import { Link } from "react-router-dom";
import DeleteArticle from "./DeleteArticle";

function ArticleCard({ article, deleteArticle, loggedInUser }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="article-card">
      <h2 className="article-title">{article.title}</h2>
      <img src={article.article_img_url} alt={article.title} />

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="information-button"
      >
        {showDetails ? "Hide Details" : "More Information"}
      </button>
      {showDetails && (
        <div className="article-data">
          <p>By: {article.author}</p>
          <p>Topic: {article.topic}</p>
          <p>Body: {article.body}</p>
          <p>Date: {article.created_at}</p>
        </div>
      )}
      <LikesCounter articleID={article.article_id} />

      <Link to={`/articles/${article.article_id}`} className="article-link">
        <button>
          <p>Comments: {article.comment_count}</p>
        </button>
      </Link>

      {loggedInUser && loggedInUser.username === article.author && (
        <DeleteArticle
          articleID={article.article_id}
          deleteArticle={deleteArticle}
        />
      )}
    </div>
  );
}

export default ArticleCard;
