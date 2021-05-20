const express = require("express");
const port = 5000;
const db = require("./project_3_v01");
const { Users, Articles, Comments, Roles } = require("./users");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { uuid } = require("uuidv4");
app.use(express.json());
const secret = process.env.SECRET;

const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];

//Server (express) [Level 1] :CARD#1>>>getAllArticles:

/*const getAllArticles = (req, res) => {
  res.status(200);
  res.json(articles);
};
app.get("/articles", getAllArticles);*/

//Server (express) [Level 1] :CARD#2>>>getArticlesByAuthor:

/*const getArticlesByAuthor = (req, res) => {
  const author = req.query.author;
  articlesByAuthor = articles.filter((elem) => {
    return elem.author === author;
  });
  res.status(200);
  res.json(articlesByAuthor);
 
};
app.get("/articles/search_1", getArticlesByAuthor);*/

//Server (express) [Level 1] :CARD#3>>>getAnArticleById:

/*const getArticlesById = (req, res) => {
  const id = req.query.id;
  articlesById = articles.filter((elem) => {
    return elem.id == id;
  });
  res.status(200);
  res.json(articlesById);
 
};
app.get("/articles/search_2", getArticlesById);*/

//Server (express) [Level 1] :CARD#4>>>createNewArticle:

/*const createNewArticle = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;
  const id = uuid();
  const newArticle = { title, description, author, id };
  for (let i = 0; i < articles.length; i++) {
    if (newArticle.id === articles[i].id) {
      id = uuid();
    }
  }

  articles.push(newArticle);
  res.status(201);
  res.json(newArticle);
  
};
app.post("/articles", createNewArticle);*/

//Server (express) [Level 1] :CARD#5>>>updateAnArticleById:

/*const updateAnArticleById = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;

  const newArticle = { id, title, description, author };
  for (let i = 0; i < articles.length; i++) {
    if (newArticle.id == articles[i].id) {
      articles.splice(i, 1, newArticle);
    }
  }
  res.status(200);
  res.json(newArticle);
  
};
app.put("/articles/:id", updateAnArticleById);*/

//Server (express) [Level 1] :CARD#6>>>deleteArticleById:

/*const deleteArticleById = (req, res) => {
  for (let i = 0; i < articles.length; i++) {
    if (req.params.id == articles[i].id) {
      const success = true;
      const massage = `Success delete article with id =>${req.params.id}`;
      const newArticle = { success, massage };
      articles.splice(i, 1);
      res.status(200);
      res.json(newArticle);
      
    }
  }
};
app.delete("/articles/:id", deleteArticleById);*/

//Server (express) [Level 1] :CARD#7>>>deleteArticlesByAuthor:

/*const deleteArticlesByAuthor = (req, res) => {
  for (let i = 0; i < articles.length; i++) {
    if (req.body.author === articles[i].author) {
      const success = true;
      const massage = `Success delete article with author =>${req.body.author}`;
      const newArticle = { success, massage };
      articles.splice(i, 1);
      res.status(200);
      res.json(newArticle);
      
    }
  }
};
app.delete("/articles", deleteArticlesByAuthor);*/

//------------------------------------------------------------------------------------------------

//Server (express) [Level 2] :CARD#1>>>createNewAuthor:

// const createNewAuthor = (req, res) => {
//   const { firstName, lastName, age, country, email, password } = req.body;
//   const newAuthor = new Users({
//     firstName,
//     lastName,
//     age,
//     country,
//     email,
//     password,
//   });

//   newAuthor
//     .save()
//     .then((result) => {
//       res.status(201);
//       res.json(result);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// };
// app.post("/users", createNewAuthor);

//MongoDB [Level 1] :CARD#1>>>createNewArticle:

const createNewArticle = async (req, res) => {
  const { title, description, author } = req.body;
  let user1;

  await Users.findOne({ _id: author })
    .then((result) => {
      user1 = result;
      console.log(user1);
    })
    .catch((err) => {
      console.log(err);
    });

  const newArticle = new Articles({
    title,
    description,
    author: user1._id,
  });
  newArticle
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
app.post("/articles", createNewArticle);

//MongoDB [Level 1] :CARD#2>>>getAllArticles:

const getAllArticles = (req, res) => {
  Articles.find({})
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
app.get("/articles", getAllArticles);

//MongoDB [Level 1] :CARD#3>>>getArticlesByAuthor:

const getArticlesByAuthor = async (req, res) => {
  const { author } = req.body;
  let author1;
  await Users.findOne({ firstName: author })
    .then((result) => {
      author1 = result;
      console.log(author1);
    })
    .catch((err) => {
      console.log(err);
    });
  Articles.find({ author: author1._id })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
app.get("/articles/search_1", getArticlesByAuthor);

//MongoDB [Level 1] :CARD#4>>>getArticlesById:

const getArticlesById = (req, res) => {
  const { id } = req.body;
  Articles.findOne({ _id: id })
    .populate("author", "firstName")
    .exec()
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
app.get("/articles/search_2", getArticlesById);

//MongoDB [Level 1] :CARD#5>>>updateAnArticleById:

const updateAnArticleById = (req, res) => {
  const { id, title, description } = req.body;
  Articles.findOneAndUpdate(
    { _id: id },
    { title: title, description: description }
  )
    .then((result) => {
      res.status(200);
      res.json("article updated");
    })
    .catch((err) => {
      res.json(err);
    });
};
app.put("/articles/id", updateAnArticleById);

//MongoDB [Level 1] :CARD#6>>>deleteArticleById:

const deleteArticleById = (req, res) => {
  const { id } = req.body.id;
  Articles.findOneAndRemove({ _id: id })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
app.delete("/articles/id", deleteArticleById);

//MongoDB [Level 1] :CARD#7>>>deleteArticlesByAuthor:

const deleteArticlesByAuthor = async (req, res) => {
  const { author } = req.body;
  let author1;
  await Users.findOne({ firstName: author })
    .then((result) => {
      author1 = result;
      console.log(author1);
    })
    .catch((err) => {
      console.log(err);
    });
  Articles.findOneAndRemove({ author: author1._id })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
app.delete("/articles", deleteArticlesByAuthor);

//Server (express) [Level 2] :CARD#2>>>login:

// const login = (req, res) => {
//   const { email, password } = req.body;
//   Users.findOne({ email: email, password: password })
//     .then((result) => {
//       if (result) {
//         res.status(200);
//         res.json("Valid login credentials");
//       } else {
//         res.status(401);
//         res.json("Invalid login credentials");
//       }
//     })
//     .catch((err) => {
//       res.status(401);
//       res.json("Invalid login credentials");
//     });
// };
// app.post("/login", login);

//Server (express) [Level 2] :CARD#3>>>createNewComment:

// const createNewComment = async (req, res) => {
//   id = req.params.id;
//   const { comment, commenter } = req.body;
//   let comment1;
//   await Users.findOne({ _id: commenter })
//     .then((result) => {
//       comment1 = result;
//       console.log(comment1);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   const newComment = new Comments({
//     comment,
//     commenter: comment1._id,
//   });
//   newComment
//     .save()
//     .then((result) => {
//       res.status(201);
//       res.json(result);
//       Articles.findOneAndUpdate(
//         { _id: id },
//         { $push: { comments: newComment } },
//         { new: true }
//       )
//         .then((result) => {
//           res.json(result);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// };
// app.post("/articles/:id/comments", createNewComment);

//3.A Authentication :CARD#1>>>createNewAuthor [level 2]:

const createNewAuthor = (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  const newAuthor = new Users({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });
  newAuthor
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
app.post("/users", createNewAuthor);

//3.A Authentication :CARD#2>>>login [level 2]:

const login = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  Users.findOne({ email: email })
    .then(async (result) => {
      let user = result;
      await bcrypt.compare(password, result.password, (err, result) => {
        console.log(result);
        if (result) {
          const payload = {
            userId: user._id,
            country: user.country,
          };
          const options = {
            expiresIn: "60min",
          };
          let token = jwt.sign(payload, secret, options);
          token = { token };
          res.json(token);
        } else {
          err = {
            message: "The password you’ve entered is incorrect",
            status: 403,
          };
          res.status(403);
          res.json(err);
        }
      });
    })
    .catch((err) => {
      err = { message: "The email doesn't exist", status: 404 };
      res.status(404);
      res.json(err);
    });
};
app.post("/login", login);

//3.A Authentication :CARD#3>>>createNewComment [level 2]:

const createNewComment = async (req, res) => {
  id = req.params.id;
  const { comment, commenter } = req.body;
  const authentication = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret, (err, result) => {
      if (err) {
        err = {
          message: "The token is in valid or expired",
          status: 403,
        };
        res.status(403);
        return res.json(err);
      }
    });
  };
  authentication(req, res);
  let comment1;
  await Users.findOne({ _id: commenter })
    .then((result) => {
      comment1 = result;
      console.log(comment1);
    })
    .catch((err) => {
      console.log(err);
    });
  const newComment = new Comments({
    comment,
    commenter: comment1._id,
  });
  newComment
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
      Articles.findOneAndUpdate(
        { _id: id },
        { $push: { comments: newComment } },
        { new: true }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};
app.post("/articles/:id/comments", createNewComment);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
