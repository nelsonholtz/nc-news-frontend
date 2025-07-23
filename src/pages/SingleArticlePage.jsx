import { useState, useEffect } from "react";
import { getNCNewsArticleID, getNCNewsCommentsByID } from "../api";
import ArticleCard from "../components/ArticleCard";
import AddCommentForm from "../components/AddCommentForm";
import { useParams } from "react-router-dom";
import "../css/articlePage.css";
import "../css/loading.css";

function SingleArticlesPage({ loggedInUser }) {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { articleID } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!isNaN(Number(articleID))) {
      setIsLoading(true);

      Promise.all([
        getNCNewsArticleID(Number(articleID)),
        getNCNewsCommentsByID(Number(articleID)),
      ])
        .then(([articleData, commentData]) => {
          setArticle(articleData.article);
          setComments(commentData.comments);
        })
        .catch((err) => {
          console.error("Error fetching article or comments:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [articleID]);

  if (isLoading) {
    return <p className="loading-message">Loading comments...</p>;
  }

  return (
    <section className="articles-container">
      <h1 className="articles">Articles</h1>
      {article && <ArticleCard article={article} />}

      {article && (
        <AddCommentForm
          articleID={Number(articleID)}
          loggedInUser={loggedInUser}
        />
      )}
    </section>
  );
}

export default SingleArticlesPage;
