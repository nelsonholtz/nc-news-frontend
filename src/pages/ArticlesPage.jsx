import { useState, useEffect } from "react";
import { getNCNewsArticle } from "../api";
import ArticleCard from "../components/ArticleCard";
import "../css/articlePage.css";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getNCNewsArticle()
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  }, []);

  return (
    <section className="articles-container">
      <h1>Articles</h1>
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
}

//Need to check why the body of information isnt coming to this page

export default ArticlesPage;
