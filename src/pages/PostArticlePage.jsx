import { useState } from "react";
import { postArticle } from "../api";
import "../css/addCommentForm.css";

function PostArticlePage({ loggedInUser, onArticlePosted }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [articleImgUrl, setArticleImgUrl] = useState("");
  const [error, setError] = useState(null);
  const [postedArticle, setPostedArticle] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim() || !topic.trim()) {
      setError("All fields except image URL are required.");
      return;
    }

    const articleData = {
      author: loggedInUser?.username,
      title: title.trim(),
      body: body.trim(),
      topic: topic.trim(),
      article_img_url: articleImgUrl.trim() || undefined,
    };

    postArticle(articleData)
      .then(({ article }) => {
        setPostedArticle(article);
        setTitle("");
        setBody("");
        setTopic("");
        setArticleImgUrl("");
        setError(null);

        if (onArticlePosted) {
          onArticlePosted(article);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to post article. Please try again.");
      });
  };

  return (
    <section className="comment-section">
      <h2 className="comment-title">Create New Article</h2>

      {error && <p className="error-message">{error}</p>}
      {postedArticle && (
        <div className="posted-article-confirmation">
          <h3>Article Posted!</h3>
          <p>Title: {postedArticle.title}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="comment-input"
        />
        <textarea
          placeholder="Article content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="comment-textarea large-textarea"
        />
        <input
          type="text"
          placeholder="Topic (e.g. coding)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="comment-input"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={articleImgUrl}
          onChange={(e) => setArticleImgUrl(e.target.value)}
          className="comment-input"
        />

        <button type="submit" className="comment-submit-btn">
          Post Article
        </button>
      </form>
    </section>
  );
}

export default PostArticlePage;
