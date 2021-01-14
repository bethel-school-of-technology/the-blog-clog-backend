var express = require('express');
var router = express.Router();
var posts = require('../models/posts');
var categories = require('../models/categories');
var myDate = new Date();

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
      newPost.save(function (err) {
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

//automatically set the category when you are making a post on a category page
router.post('/:category', (req, res, next) => {
  console.log(req.body);
  posts.findOne({
    header: req.body.header,
  })
    .then(post => {
      let newPost = new posts({
        header: req.body.header,
        content: req.body.content,
        category: (req.params.category),
        date: req.body.myDate
      });
      newPost.save(function (err) {
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

// router.get('/searchId/:postId', function(req, res, next) {
//     posts.find({}).where("_id").equals(req.params.postId)
//     .then(post=> {
//       res.json({
//         posts: post,
//         success: "found post"
//       })
//     })
//   });

router.get('/search', function (req, res, next) {
  posts.find({})
    .then(post => {
      res.json({
        posts: post
      });
    });
});

module.exports = router;