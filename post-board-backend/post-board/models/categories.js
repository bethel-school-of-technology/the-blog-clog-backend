var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    title: String,
    description: String,
   });

module.exports = mongoose.model('categories', categorySchema);