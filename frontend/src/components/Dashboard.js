import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [status, setStatus] = useState(false);
  const [articles, setArticles] = useState(undefined);
 
  const getAllArticle = () => {
    axios
      .get(`http://localhost:5000/articles`)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllArticle();
  }, [status]);

  return (
    <div>
      <p>dashboard</p>
      <button
        onClick={() => {
            setStatus();
        }}
      >
        Get All Articles
      </button>
   {articles && articles.map((elem, i) =>  <div key={i}><h1> {elem.title} </h1> <p>{elem.description}</p> </div>)}
    </div>
  );
}
