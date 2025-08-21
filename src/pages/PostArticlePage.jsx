import { useState } from "react";
import { postArticle, postTopics } from "../api";
import "../css/addCommentForm.css";
import "../css/errorMessage.css";

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
      setError(" You must be logged in to post an article.");
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    const trimmedTopic = topic.trim();
    const trimmedImgUrl = articleImgUrl.trim();
    const trimmedDesc = newTopicDesc.trim();

    if (!trimmedTitle || !trimmedBody || !trimmedTopic) {
      setError("All fields except image URL are required.");
      return;
    }

    const articleData = {
      author: loggedInUser.username,
      title: trimmedTitle,
      body: trimmedBody,
      topic: trimmedTopic,
      article_img_url: trimmedImgUrl || undefined,
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
        .catch((err) => {
          console.error(err);
          setError("Failed to post article. Please try again.");
        });
    };

    if (useNewTopic) {
      if (!trimmedDesc) {
        setError("New topic description is required.");
        return;
      }

      postTopics({ slug: trimmedTopic, description: trimmedDesc })
        .then(() => {
          postTheArticle();
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to create new topic. It might already exist.");
        });
    } else {
      postTheArticle();
    }
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
          className="comment-input"
        />

        <textarea
          placeholder="Article content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="comment-textarea large-textarea"
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
          className="comment-input"
        />

        {useNewTopic && (
          <input
            type="text"
            placeholder="New topic description"
            value={newTopicDesc}
            onChange={(e) => setNewTopicDesc(e.target.value)}
            className="comment-input"
          />
        )}

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
