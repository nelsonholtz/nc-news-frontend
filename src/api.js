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
