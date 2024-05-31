import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/article.css";
import articleFile from "../data/article.json";

const fetchArticle = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (data.error) {
    console.error(data.error);
    return articleFile;
  }
  return data;
};

const Article = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const apiUrl = `https://midaiganes.irw.ee/api/list/${id || "972d2b8a"}`;

  useEffect(() => {
    fetchArticle(apiUrl).then((data) => setArticle(data));
  }, [apiUrl]);

  if (!article) {
    return <div>Loading...</div>;
  }

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
      {article.image && (
        <img
          className="article_image"
          src={article.image.large}
          alt={article.image.alt}
          title={article.image.title}
        />
      )}
      <div
        className="body"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
      <div className="tags">
        {article.tags?.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Article;
