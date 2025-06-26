import { useState, useEffect } from "react";
import { patchArticleVote, getNCNewsArticleID, patchCommentVote } from "../api";
import "../css/buttons.css";

export function LikesCounter({ articleID }) {
  const [likesCount, setLikesCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    getNCNewsArticleID(articleID)
      .then((data) => {
        setLikesCount(data.article.votes);
      })
      .catch((err) => {
        setError("Failed to fetch vote count.");
        console.error("Fetch error:", err);
      });
  }, [articleID]);

  const handleLike = (voteChange) => {
    setLikesCount((currentLikesCount) => currentLikesCount + voteChange);
    setError(null);
    patchArticleVote(articleID, voteChange).catch((err) => {
      setLikesCount((currentLikesCount) => currentLikesCount - voteChange);
      setError("Your like was not successful. Please try again!");
      console.error("Error:", err);
    });
  };

  return (
    <div className="LikeButton">
      <button
        onClick={function () {
          handleLike(1);
        }}
      >
        Like
      </button>
      <button
        onClick={function () {
          handleLike(-1);
        }}
      >
        Dislike
      </button>
      {error ? <p>{error}</p> : null}

      <p>Votes{likesCount}</p>
    </div>
  );
}

export function CommentVotes({ commentID, initialVotes = 0 }) {
  const [commentVotes, setCommentVotes] = useState(initialVotes);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCommentVotes(initialVotes);
  }, [initialVotes]);

  const handleVote = (voteChange) => {
    setCommentVotes((current) => current + voteChange);
    setError(null);
    patchCommentVote(commentID, voteChange).catch((err) => {
      setCommentVotes((current) => current - voteChange);
      setError("Your vote was not successful. Please try again!");
      console.error("Error:", err);
    });
  };

  return (
    <div className="LikeButton">
      <button onClick={() => handleVote(1)}>Like</button>
      <button onClick={() => handleVote(-1)}>Dislike</button>
      {error && <p>{error}</p>}
      <p>Votes: {commentVotes}</p>
    </div>
  );
}
