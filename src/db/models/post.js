const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    Title: { type: String, trim: true, required: true },
    Body: { type: String, trim: true, required: true },
    CreatedBy: { type: String, required: true },
    IsActive: { type: Boolean, required: true }
}, {
    collection: 'post'
});

const Post = mongoose.model('post', Post);

module.exports = Post;

