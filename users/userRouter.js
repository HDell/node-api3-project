const express = require('express');
const router = express.Router();
const UserDB = require('./userDb.js');
const PostDB = require('../posts/postDb.js');

router.post('/', validateUser, (req, res) => {
    const userObj = req.body;
    UserDB.insert(userObj)
        .then(addedUser => {
            res.status(201).json(addedUser);
        })
        .catch(err => {
            res.status(500).json({message: "Sorry, the server experienced an error."});
        })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
    const postObj = req.body;
    PostDB.insert(postObj)
        .then(addedPost => {
            res.status(201).json(addedPost);
        })
        .catch(err => {
            res.status(500).json({message: "Sorry, the server experienced an error."});
        });
});

router.get('/', (req, res) => {
    UserDB.get()
        .then(userObjs => {
            res.status(200).json(userObjs);
        })
        .catch(err => {
            res.status(500).json({message: "Sorry, the server experienced an error."});
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    UserDB.getById(id)
        .then(userObj => {
            res.status(200).json(userObj);
        })
        .catch(err => {
            res.status(500).json({message: "Sorry, the server experienced an error."});
        });
});

router.get('/:id/posts', (req, res) => {
    const userId = req.params.id;
    UserDB.getUserPosts(userId)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({message: "Sorry, the server experienced an error."});
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    UserDB.remove(id)
        .then(removedUser => {
            res.status(200).json(removedUser);
        })
        .catch(err => {
            res.status(500).json({message: "Sorry, the server experienced an error."});
        });
});

router.put('/:id', validateUser, (req, res) => {
    const userObj = req.body;
    const { id } = req.params;
    UserDB.update(id, userObj)
        .then(updatedUser => {
            res.status(200).json(updatedUser);
        })
        .catch(err => {
            res.status(500).json({message: "Sorry, the server experienced an error."});
        });
});

//custom middleware

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

module.exports = router;
