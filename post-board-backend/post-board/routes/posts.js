var express = require('express');
var router = express.Router();
var posts = require('../models/posts');

router.post('/post', (req, res, next) => {
    console.log(req.body);
    posts.findOne({
      header: req.body.header,
    })
    .then(post => {
        let newPost = new posts({
          header: req.body.header,
          content: req.body.content,
          category: req.body.category
        });
        newPost.save(function(err) {
          if (err) {
            console.log(err);
            res.json({
              status: 400,
              message: "error creating post"
            });
          } else {
            console.log(newPost);
            res.json({
              status: 200, 
              message: 'post created'
            });
          };
        });
      });
  });

module.exports = router;