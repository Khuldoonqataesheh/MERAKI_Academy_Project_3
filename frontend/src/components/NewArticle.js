import React, { useState } from "react";
import axios from "axios";

export default function NewArticle(props) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [massage, setMassage] = useState(undefined);

  const newArticle = () => {
    axios
      .post(
        `http://localhost:5000/articles`,
        {
          title,
          description,
        },
        { headers: { Authorization: `Bearer ${props.token}` } }
      )
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          setMassage(
            <div className="success">
              The article has been created successfully
            </div>
          );
        } else {
          setMassage(
            <div className="error">
              {" "}
              Error happened while creating a new article, please try again
            </div>
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <p>New Article</p>
      <input
        type="text"
        placeholder="title here"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <textarea
        type="text"
        placeholder="description Here"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <button onClick={newArticle}>Create New Article</button>
      {massage}
    </div>
  );
}
