const express = require("express");
const app = express();
const port = 5000;
const { uuid } = require('uuidv4');
app.use(express.json());

const articles = [
    {
    id: 1,
    title: 'How I learn coding?',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    {
    id: 2,
    title: 'Coding Best Practices',
    description:
    'Lorem, ipsum dolor sit, Quam, mollitia.',
    author: 'Besslan',
    },
    {
    id: 3,
    title: 'Debugging',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    ];

    
//CARD#1>>>getAllArticles:

  const getAllArticles = (req, res) => {
    res.status(200);
    res.json(articles);
}
app.get("/articles", getAllArticles);

//CARD#2>>>getArticlesByAuthor:

const getArticlesByAuthor = (req, res) => {
    const author = req.query.author
    articlesByAuthor = articles.filter((elem)=>{   
        return elem.author === author
    })
    res.json(articlesByAuthor);
    res.status(200);
}
  app.get("/articles/search_1", getArticlesByAuthor);

  //CARD#3>>>getAnArticleById:
  const getArticlesById = (req, res) => {
    const id = req.query.id
    articlesById = articles.filter((elem)=>{   
        return elem.id == id
    })
    res.json(articlesById);
    res.status(200);
}
  app.get("/articles/search_2", getArticlesById);

 //CARD#4>>>createNewArticle:

 const createNewArticle = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const id = uuid();
    const newArticle = { title, description,author,id};
    for(let i = 0 ; i<articles.length ; i++){
        if(newArticle.id===articles[i].id){
            id = uuid()
        }
    }
   
    articles.push(newArticle)
res.json(newArticle)
    res.status(201);
}
  app.post("/articles", createNewArticle);
  //CARD#5>>>updateAnArticleById:

  const updateAnArticleById = (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
  
    const newArticle = {id, title, description,author};
    for(let i = 0 ; i<articles.length ; i++){
        if(newArticle.id==articles[i].id){
            articles.splice(i,1,newArticle)
            
        }
    }
    res.json(newArticle)
    res.status(201);
}
  app.put("/articles/:id", updateAnArticleById);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });