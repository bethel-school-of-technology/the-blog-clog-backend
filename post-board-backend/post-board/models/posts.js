var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    header: String,
    content: String,
    category: String,
    date: Date
});

module.exports = mongoose.model('posts', postSchema);