import { useState, useEffect } from "react";
import { getNCNewsArticle, getNCNewsCommentsByID } from "../api";
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
      <div>
        <h1 className="articles">Articles</h1>
      </div>

      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
}

//Need to check why the body of information isnt coming to this page

export default ArticlesPage;
