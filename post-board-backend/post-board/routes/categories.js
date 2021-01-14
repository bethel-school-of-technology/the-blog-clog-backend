var express = require('express');
var router = express.Router();
var categories = require('../models/categories');
var posts = require('../models/posts');

//need route that renders all category titles, descriptions, and a link to the site on one page
router.get('/categories', function(req,res,next){
  categories.find({})
  .then(categories=> {
        res.json({
          category: categories,
          success: "found all categories"
        })
      })
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
//   router.get('/category/:title', (req, res, next ) => {
//     console.log(req.params.title);
//     categories.findOne({
//       title: req.params.title
//     })
//     .then(response => {
//       res.json({
//         status: 200,
//         category: response
//       });
//     });
//   });

  /* GET home page. */

router.get('/:category', function(req, res, next) {
      posts.find({}).where("category").equals(req.params.category)
      .then(post=> {
        res.json({
          category: post,
          success: "found posts"
        })
      })
    });

    router.get('/search/:term', function(req, res, next) {
        categories.find({ title: { $regex: ((req.params.term)), $options: "i"} })
        .then(categories=> {
          res.json({
            results: categories,
            success: "found searches"
          })
        })
      });

module.exports = router;