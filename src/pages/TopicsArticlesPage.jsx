import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleByTopic, getNCNewsArticleID } from "../api";
import ArticleCard from "../components/ArticleCard";
import "../css/articlePage.css";
import "../css/loading.css";

function TopicArticlePage() {
  const { topicSlug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetchArticleByTopic(topicSlug)
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
        setError("Failed to load topic articles");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topicSlug]);

  if (isLoading) {
    return <p className="loading-message">Loading topic articles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="articles-container">
      <div>
        <h1 className="articles">Articles about: {topicSlug}</h1>
      </div>

      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
}

export default TopicArticlePage;
