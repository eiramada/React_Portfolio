import React, { useEffect, useState } from "react";
import "../css/article.css";
import articleFile from "../data/article.json";

function Article() {
  const [article, setArticle] = useState();
  const apiUrl = "https://midaiganes.irw.ee/api/list/972d2b8a";

  useEffect(() => {
    fetch(apiUrl)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        if (json.error) {
          console.log(json.error);
          setArticle(articleFile);
        } else {
          setArticle(json);
        }
      });
  }, [apiUrl]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article">
      <h1>{article.title}</h1>
      <div
        className="intro"
        dangerouslySetInnerHTML={{ __html: article.intro }}
      />
      <img
        className="article_image"
        src={article.image.large}
        alt={article.image.alt}
        title={article.image.title}
      />
      <div
        className="body"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
      <div className="tags">
        {article.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Article;
