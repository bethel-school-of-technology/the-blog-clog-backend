var express = require('express');
var router = express.Router();
var categories = require('../models/categories');
var posts = require('../models/posts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/categories', function(req,res,next){
  //we need to render a list of all the existing categories
});

//we need to get the json object from a form in the front end
router.post('/createCategory', (req, res, next) => {
  console.log(req.body);
  categories.findOne({
    title: req.body.title,
  })
  .then(category => {
    if(category) {
      res.send('Category already exsits');
    } else {
      let newCategory = new categories({
        title: req.body.title,
        description: req.body.description
      });
      newCategory.save(function(err) {
        if (err) {
          console.log(err);
          res.json({
            status: 400,
            message: "error creating category"
          });
        } else {
          console.log(newCategory);
          res.json({
            status: 200, 
            message: 'category created'
          });
        };
      });
    };
  });
});

//these links need to be pre rendered on the "categories" page. 
//check out the categories.hbs file I started working on. 
//We can use "{{title}}" inside the link for each object.
router.get('/category/:title', (req, res, next ) => {
  console.log(req.params.title);
  categories.findOne({
    title: req.params.title
  })
  .then(response => {
    res.json({
      status: 200,
      category: response
    });
  });
});

//repeat these routes with making posts
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

// router.get('/posts/:category', (req, res, next ) => {
//   posts.findOne({
//     title: req.params.title
//   })
//   .then(response => {
//     res.json({
//       status: 200,
//       category: response
//     });
//   });
// });

module.exports = router;
