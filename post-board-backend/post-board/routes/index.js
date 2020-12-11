var express = require('express');
var router = express.Router();
var categories = require('../models/categories');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/categories', function(req,res,next){
  
})

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
          })
        }
      })
    }
  })
});

router.get('/category/:title', (req, res, next ) => {
  console.log(req.params.title);
  categories.findOne({
    title: req.params.title
  })
  .then(response => {
    res.json({
      status: 200,
      category: response
    })
  })
});

module.exports = router;
