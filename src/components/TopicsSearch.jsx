import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTopics } from "../api";
import "../css/header.css";

function TopicsSearch() {
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTopics()
      .then((data) => {
        setTopics(data.topics);
      })
      .catch((err) => {
        console.error("failed to load topics", err);
      });
  }, []);

  const filteredTopics = topics.filter((topic) =>
    topic.slug.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleTopicClick = (slug) => {
    navigate(`/topics/${slug}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredTopics.length > 0) {
        navigate(`/topics/${filteredTopics[0].slug}`);
        setShowSuggestions(false);
      } else {
        alert("No matching topic found.");
      }
    }
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      if (
        inputRef.current &&
        !inputRef.current.contains(document.activeElement)
      ) {
        setShowSuggestions(false);
      }
    }, 100);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div>
      <div
        className="search-container"
        style={{ position: "relative" }}
        ref={inputRef}
      >
        <input
          className="search-bar"
          type="text"
          placeholder="Search for a topic..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
        />

        {showSuggestions && searchTerm && filteredTopics.length > 0 && (
          <ul
            style={{
              position: "absolute",
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: 0,
              margin: 0,
              listStyle: "none",
              width: "100%",
              zIndex: 100,
            }}
          >
            {filteredTopics.map((topic) => (
              <li
                key={topic.slug}
                onClick={() => handleTopicClick(topic.slug)}
                style={{ padding: "8px", cursor: "pointer" }}
              >
                {topic.slug}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TopicsSearch;
