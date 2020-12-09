const express = require('express');
var router = express.Router();
const mysql = require('mysql');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://MainUser:Password1!@cluster0.tlzgv.mongodb.net/PostBoard?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const categoriesList = "db.categories.find({ _id : { $gte : 1 } })"

router.get('/categories', function (req,res,next){
  connection.query(categoriesList, function (err, reult){
    res.render('categories', {categories: result})
  });
});

router.post('createCategories', function (req,res,next){
  console.log(req.body);
  const newCategory = {
    title: req.body.title,
    description: req.body.description
  };
});

module.exports = router;
