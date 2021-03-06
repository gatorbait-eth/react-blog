import express from "express";
import bodyParser from "body-parser";

//a fake database placeholder before using
const articlesInfo = {
  "react-blog": {
    upvotes: 0,
    comments: [],
  },
  "node.js": {
    upvotes: 0,
    comments: [],
  },
};

//parses json object included with post request and adds body property to request parameter of matching route
app.use(bodyParser.json());

//  recieves a get request on the endpoint /hello and repospons with a responce hello.
//  information contained in URL
//  Takes a callback argument which contains details about the request(req) and a reponce object(res)
//      app.get(`/hello`, (req, res) => res.send(`Hello`));
//      app.get(`/hello/:name`, (req, res) => res.send(`Hello ${req.params.name}`));
//  post requets carry additional inpormation to pass along data to the server
//      app.post(`/hello`, (req, res) => res.send(`Hello ${req.body.name}`));

app.post(`/api/articles/:name/upvote`, (req, res) => {
  const articleName = req.params.name;

  //add upvote to database
  articlesInfo[articleName].upvotes += 1;
  //how many upvotes the article has
  res.status(200).send(`${articleName} now has ${articlesInfo} upvotes`);
});

app.post(`api.articles/:name/add-comment`, (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  articlesInfo[articleName].comments.push({ username, text });
  res.status(200).send(articlesInfo[articleName]);
});

//start server, takes a port to start and a callback to get called when server is listening, this logs message
app.listen(8000, () => console.log(`Listening on port 8000`));
