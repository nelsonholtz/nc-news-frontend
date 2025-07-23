import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllTopics } from "../api";

function TopicsSearch() {
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    topic.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTopicClick = (slug) => {
    navigate(`/topics/${slug}`);
  };

  return (
    <div>
      <h2>Search Topics</h2>
      <input
        type="text"
        placeholder="Search for a topic..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", width: "300px", marginBottom: "10px" }}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTopics.map((topic) => (
          <li
            key={topic.slug}
            onClick={() => handleTopicClick(topic.slug)}
            style={{
              cursor: "pointer",
              padding: "6px 10px",
              borderBottom: "1px solid #ccc",
              maxWidth: "300px",
            }}
          >
            {topic.slug}
          </li>
        ))}
        {filteredTopics.length === 0 && <li>No topics found.</li>}
      </ul>
    </div>
  );

  //   return (
  //     <div>
  //       <h2>Topics</h2>
  //       <div>
  //         {topics.map((topic) => (
  //           <Link key={topic.slug} to={`/topic/${topic.slug}`}>
  //             <button>{topic.slug}</button>
  //           </Link>
  //         ))}
  //       </div>
  //     </div>
  //   );
}

export default TopicsSearch;
