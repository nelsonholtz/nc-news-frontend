import { useState, useEffect } from "react";
import { getNCNewsArticle } from "../api";
import ArticleCard from "../components/ArticleCard";
import "../css/articlePage.css";
import "../css/loading.css";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getNCNewsArticle()
      .then((data) => {
        setArticles(data.articles);
        setError(null);
      })
      .catch((err) => {
        console.error("Error", err);
        setError("Failed to load articles");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className="loading-message">Loading articles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="articles-container">
      <div>
        <h1 className="articles">Articles</h1>
      </div>

      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
}

export default ArticlesPage;
