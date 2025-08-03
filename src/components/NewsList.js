import React from "react";

const NewsList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p>No news available.</p>;
  }

  return (
    <div>
      {articles.map((article, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default NewsList;
