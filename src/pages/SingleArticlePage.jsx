import { useState, useEffect } from "react";
import { getNCNewsArticleID, getNCNewsCommentsByID } from "../api";
import ArticleCard from "../components/ArticleCard";
import CommentCard from "../components/CommentCard";
import { useParams } from "react-router-dom";
import "../css/articlePage.css";

function SingleArticlesPage() {
  const [article, setArticle] = useState(null);
  const { articleID } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!isNaN(Number(articleID))) {
      getNCNewsArticleID(Number(articleID))
        .then((data) => {
          setArticle(data.article);
        })
        .catch((err) => {
          console.error("Article Error", err);
        });

      getNCNewsCommentsByID(Number(articleID))
        .then((data) => {
          setComments(data.comments);
        })
        .catch((err) => {
          console.log("Comment Error", err);
        });
    }
  }, [articleID]);

  return (
    <section className="articles-container">
      <h1>Articles</h1>
      {article && <ArticleCard article={article} />}
      <h2> Comments </h2>
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </section>
  );
}

export default SingleArticlesPage;
