import { useState } from "react";
import { postArticle, postTopics } from "../api";
import "../css/postArticlePage.css"; // new name to separate from comments CSS

function PostArticlePage({ loggedInUser, onArticlePosted }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [articleImgUrl, setArticleImgUrl] = useState("");
  const [error, setError] = useState(null);
  const [postedArticle, setPostedArticle] = useState(null);
  const [useNewTopic, setUseNewTopic] = useState(false);
  const [newTopicDesc, setNewTopicDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!loggedInUser) {
      setError("You must be logged in to post an article.");
      return;
    }

    const trimmed = {
      title: title.trim(),
      body: body.trim(),
      topic: topic.trim(),
      img: articleImgUrl.trim(),
      desc: newTopicDesc.trim(),
    };

    if (!trimmed.title || !trimmed.body || !trimmed.topic) {
      setError("All fields except image URL are required.");
      return;
    }

    const articleData = {
      author: loggedInUser.username,
      title: trimmed.title,
      body: trimmed.body,
      topic: trimmed.topic,
      article_img_url: trimmed.img || undefined,
    };

    const postTheArticle = () => {
      postArticle(articleData)
        .then(({ article }) => {
          setPostedArticle(article);
          setTitle("");
          setBody("");
          setTopic("");
          setArticleImgUrl("");
          setUseNewTopic(false);
          setNewTopicDesc("");
          if (onArticlePosted) onArticlePosted(article);
        })
        .catch(() => setError("Failed to post article. Please try again."));
    };

    if (useNewTopic) {
      if (!trimmed.desc) {
        setError("New topic description is required.");
        return;
      }

      postTopics({ slug: trimmed.topic, description: trimmed.desc })
        .then(postTheArticle)
        .catch(() =>
          setError("Failed to create new topic. It might already exist.")
        );
    } else {
      postTheArticle();
    }
  };

  return (
    <section className="post-article-container">
      <h2 className="post-article-title">Create New Article</h2>

      {error && <p className="error-message">{error}</p>}

      {postedArticle && (
        <div className="posted-confirmation">
          <h3>✅ Article Posted!</h3>
        </div>
      )}

      <form onSubmit={handleSubmit} className="post-article-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="post-input"
        />

        <textarea
          placeholder="Article content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="post-textarea"
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={useNewTopic}
            onChange={() => setUseNewTopic(!useNewTopic)}
          />
          Post to a new topic
        </label>

        <input
          type="text"
          placeholder={useNewTopic ? "New topic name" : "Topic (e.g. coding)"}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="post-input"
        />

        {useNewTopic && (
          <input
            type="text"
            placeholder="New topic description"
            value={newTopicDesc}
            onChange={(e) => setNewTopicDesc(e.target.value)}
            className="post-input"
          />
        )}

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={articleImgUrl}
          onChange={(e) => setArticleImgUrl(e.target.value)}
          className="post-input"
        />

        <button type="submit" className="post-submit-btn">
          ✨ Post Article
        </button>
      </form>
    </section>
  );
}

export default PostArticlePage;
