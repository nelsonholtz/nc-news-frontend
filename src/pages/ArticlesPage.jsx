import { useState, useEffect } from "react";
import { getNCNewsArticle, getNCNewsArticleID } from "../api";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import PostArticle from "../components/PostArticle";
import "../css/articlePage.css";
import "../css/loading.css";
import "../css/buttons.css";

function ArticlesPage({ loggedInUser }) {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const deleteArticle = (idToRemove) => {
    setArticles((currArticles) =>
      currArticles.filter((article) => article.article_id !== idToRemove)
    );
  };

  const fetchArticles = () => {
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
  };

  useEffect(() => {
    fetchArticles();
  }, [sortBy, order]);

  const addNewArticle = (article) => {
    setArticles((currentArticles) => [article, ...currentArticles]);
  };

  if (isLoading) {
    return <p className="loading-message">Loading articles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="articles-container">
      <div></div>

      {/* <PostArticle
        loggedInUser={loggedInUser}
        onPostSuccess={fetchArticles}
        onArticlePosted={addNewArticle}
        /> */}

      <div className="sort-container">
        <h1 className="articles">Articles</h1>
        <div className="sort-group">
          <label className="sort-label">Sort by:</label>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) =>
              setSearchParams({ sort_by: e.target.value, order })
            }
          >
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
          </select>
        </div>
        <div className="sort-group">
          <label className="sort-label">Order:</label>
          <select
            className="sort-select"
            value={order}
            onChange={(e) =>
              setSearchParams({ sort_by: sortBy, order: e.target.value })
            }
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {articles.map((article) => (
        <ArticleCard
          key={article.article_id}
          article={article}
          deleteArticle={deleteArticle}
          loggedInUser={loggedInUser}
        />
      ))}
    </section>
  );
}

export default ArticlesPage;
