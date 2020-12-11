var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    header: String,
    content: String,
    category: String,
   });

module.exports = mongoose.model('posts', postSchema);