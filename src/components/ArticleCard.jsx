import { useState } from "react";
import { LikesCounter } from "../components/VoteButtons";
import { Link } from "react-router-dom";
import DeleteArticle from "./DeleteArticle";
import FormattedDate from "./FormattedDate";
import "../css/buttons.css";
import "../css/articleCard.css";

function ArticleCard({
  article,
  deleteArticle,
  loggedInUser,
  hideTitle = false,
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="article-card">
      <div className="top-article-line">
        {!hideTitle && <h2 className="article-title">{article.title}</h2>}

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="info-toggle-button"
        >
          {showDetails ? "Hide Info" : "More Info"}
        </button>

        {showDetails && (
          <div className="article-details">
            <p className="detail-item">
              <span className="detail-label">By:</span> {article.author}
            </p>
            <p className="detail-item">
              <span className="detail-label">Topic:</span> {article.topic}
            </p>
            <p className="detail-item">
              <span className="detail-label">Body:</span> {article.body}
            </p>
            <p className="detail-item">
              <span className="detail-label">Date:</span>{" "}
              <FormattedDate dateString={article.created_at} />
            </p>
          </div>
        )}
      </div>

      <Link
        to={`/articles/${article.article_id}`}
        className="article-image-link"
      >
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-image"
        />
      </Link>
      <>
        <div className="article-line">
          <LikesCounter articleID={article.article_id} />
          <Link to={`/articles/${article.article_id}`} className="article-link">
            <button className="comment-button">
              <span className="comment-count">{article.comment_count}</span>
              <span className="comment-label">Comments</span>
            </button>
          </Link>
          {loggedInUser && loggedInUser.username === article.author && (
            <DeleteArticle
              articleID={article.article_id}
              deleteArticle={deleteArticle}
            />
          )}
        </div>
      </>
    </div>
  );
}

export default ArticleCard;
