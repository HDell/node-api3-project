const express = require('express');
const server = express();
const userRoute = require('./users/userRouter.js');
const postRoute = require('./posts/postRouter.js');

server.use('/api/user', userRoute);
server.use('/api/post', postRoute);

server.get('/', (req, res) => {
  const songs = [
    {
      id: 1,
      name: "Final Countdown"
    }
  ];
  res.status(200).json(songs);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl} at ${Date()}`);
  next();
}
function validateUserId(req, res, next) {
  const {user_id} = req.body;
  if (user_id) {
    req.user = req.body;
    next();
  } else {
    res.status(400).json({message: "invalid user id"});
  }
}
function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({message: "missing user data"});
  } else {
    if (!req.body.name) {
      res.status(400).json({message: "missing required name field"});
    } else {
      next();
    }
  }
}
function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({message: "missing post data"});
  } else {
    if (!req.body.text) {
      res.status(400).json({message: "missing required text field"});
    } else {
      next();
    }
  }
}

module.exports = server;
