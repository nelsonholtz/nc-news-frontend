import { useState, useEffect } from "react";
import { getNCNewsArticle, getNCNewsArticleID } from "../api";
import ArticleCard from "../components/ArticleCard";
import "../css/articlePage.css";
import "../css/loading.css";
import { useSearchParams } from "react-router-dom";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    getNCNewsArticle(sortBy, order)
      .then((data) => {
        const articleList = data.articles;
        return Promise.all(
          articleList.map((a) => getNCNewsArticleID(a.article_id))
        );
      })
      .then((fullArticles) => {
        const articlesWithBody = fullArticles.map((res) => res.article);
        setArticles(articlesWithBody);
        setError(null);
      })
      .catch((err) => {
        console.error("Error", err);
        setError("Failed to load articles");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sortBy, order]);

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

      <div className="sort-controls">
        <label>
          Sort by:
          <select
            value={sortBy}
            onChange={(e) =>
              setSearchParams({ sort_by: e.target.value, order })
            }
          >
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
          </select>
        </label>

        <label>
          order:
          <select
            value={order}
            onChange={(e) =>
              setSearchParams({ sort_by: sortBy, order: e.target.value })
            }
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>

      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
}

export default ArticlesPage;
