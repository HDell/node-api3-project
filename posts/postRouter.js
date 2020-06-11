const express = require('express');
const router = express.Router();
const PostDB = require('./postDb.js');

router.get('/', (req, res) => {
    PostDB.get().then(post => {
        res.status(200).json(post);
    }).catch(err => {
        res.status(500).json({message: "Sorry, the server experienced an error."})
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    PostDB.getById(id).then(post => {
        res.status(200).json(post);
    }).catch(err => {
        res.status(500).json({message: "Sorry, the server experienced an error."})
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    PostDB.remove(id).then(post => {
        res.status(200).json(post);
    }).catch(err => {
        res.status(500).json({message: "Sorry, the server experienced an error."})
    })
});

router.put('/:id', (req, res) => {
    const postObj = req.body;
    const { id } = req.params;
    PostDB.update(id, postObj).then(updatedPost => {
        res.status(200).json(updatedPost);
    }).catch(err => {
        res.status(500).json({message: "Sorry, the server experienced an error."})
    })
});

// custom middleware

function validatePostId(req, res, next) {
    const {post_id} = req.body;
    if (post_id) {
        req.post = req.body;
        next();
    } else {
        res.status(400).json({message: "invalid post id"});
    }
}

module.exports = router;
