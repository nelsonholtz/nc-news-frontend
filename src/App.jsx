import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticlesPage from "./pages/ArticlesPage";
import SingleArticlePage from "./pages/SingleArticlePage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>

      <main>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:articleID" element={<SingleArticlePage />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
