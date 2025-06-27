export function getNCNewsArticle() {
  return fetch(`https://nc-news-r68d.onrender.com/api/articles`).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to fetch articles",
      });
    }
    return res.json();
  });
}

export function getNCNewsArticleID(articleID) {
  return fetch(
    `https://nc-news-r68d.onrender.com/api/articles/${articleID}`
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to fetch single articles",
      });
    }
    return res.json();
  });
}

export function getNCNewsCommentsByID(articleID) {
  return fetch(
    `https://nc-news-r68d.onrender.com/api/articles/${articleID}/comments`
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to fetch comments",
      });
    }
    return res.json();
  });
}

export function patchArticleVote(articleId, voteChange) {
  const body = JSON.stringify({ inc_votes: voteChange });

  return fetch(`https://nc-news-r68d.onrender.com/api/articles/${articleId}`, {
    method: "PATCH",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to update vote",
      });
    }
    return res.json();
  });
}

export function patchCommentVote(commentID, voteChange) {
  const body = JSON.stringify({ inc_votes: voteChange });

  return fetch(`https://nc-news-r68d.onrender.com/api/comments/${commentID}`, {
    method: "PATCH",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to update vote",
      });
    }
    return res.json();
  });
}

export function postComment(articleID, username, commentBody) {
  const commentData = { username, body: commentBody };
  console.log("Sending to API:", commentData);

  return fetch(
    `https://nc-news-r68d.onrender.com/api/articles/${articleID}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    }
  ).then((response) => {
    if (!response.ok) {
      return Promise.reject({
        status: response.status,
        msg: "Failed to post comment",
      });
    }
    return response.json();
  });
}

export function deleteCommentIdAPI(commentID) {
  return fetch(`https://nc-news-r68d.onrender.com/api/comments/${commentID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject({
        status: response.status,
        msg: "Failed to delete comment",
      });
    }
    return response.text().then((text) => {
      return text ? JSON.parse(text) : {};
    });
  });
}
