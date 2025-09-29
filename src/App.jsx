import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ParticlesBg from "particles-bg";

import Header from "./components/Header";
import ArticlesPage from "./pages/ArticlesPage";
import SingleArticlePage from "./pages/SingleArticlePage";
import HomePage from "./pages/HomePage";
import LoginRegister from "./pages/LoginRegisterPage";
import TopicArticlePage from "./pages/TopicsArticlesPage";
import PostArticlePage from "./pages/PostArticlePage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) setLoggedInUser(JSON.parse(storedUser));
  }, []);

  return (
    <>
      {/* Full-page particles */}
      <div
        id="particles-background"
        style={{
          position: "fixed", // keeps it fixed on the screen
          top: 0,
          left: 0,
          width: "100%",
          height: "100%", // full viewport
          zIndex: 0, // behind content
        }}
      >
        <ParticlesBg
          type="cobweb"
          bg={false} // false because the wrapper handles background
          color="#99ccff"
          num={120}
        />
      </div>

      {/* Scrollable content above particles */}
      <div className="scrollable-content">
        <header>
          <Header
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
        </header>

        <main>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <LoginRegister
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/articles"
              element={<ArticlesPage loggedInUser={loggedInUser} />}
            />
            <Route
              path="/post"
              element={<PostArticlePage loggedInUser={loggedInUser} />}
            />
            <Route
              path="/articles/:articleID"
              element={<SingleArticlePage loggedInUser={loggedInUser} />}
            />
            <Route path="/topics/:topicSlug" element={<TopicArticlePage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
