const express = require("express");
const db = require("./project_3_v01");
const { Users, Articles } = require("./users");
const app = express();
const port = 5000;
const { uuid } = require("uuidv4");
app.use(express.json());

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

const updateAnArticleById = (req, res) => {
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
app.put("/articles/:id", updateAnArticleById);

//Server (express) [Level 1] :CARD#6>>>deleteArticleById:

const deleteArticleById = (req, res) => {
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
app.delete("/articles/:id", deleteArticleById);

//Server (express) [Level 1] :CARD#7>>>deleteArticlesByAuthor:

const deleteArticlesByAuthor = (req, res) => {
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
app.delete("/articles", deleteArticlesByAuthor);

//MongoDB [Level 1] :CARD#0>>>createNewAuthor:

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

//MongoDB [Level 1] :CARD#1>>>createNewAuthor:

const createNewArticle = async (req, res) => {
  const { title, description, author} = req.body;
  let user1;

  await Users.findOne({ _id: author })
    .then((result) => {
      user1 = result;
      console.log(user1);
    })
    .catch((err) => {
      console.log(err);
    });

  const newArticle =  new Articles({
    title,
    description,
    author: user1._id
  });
console.log(newArticle);
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

const getArticlesByAuthor = (req, res) => {
  const {author} = req.body;
  Articles.findOne({ _id: author })
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
  const {id} = req.body;
  Articles.findOne({ _id: id }).populate("author","firstName")
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
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
