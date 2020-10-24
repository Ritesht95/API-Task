const mongoose = require('mongoose');

const Posts = new mongoose.Schema({
    Title: { type: String, trim: true, required: true },
    Body: { type: String, trim: true, required: true },
    CreatedBy: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'user' },
    IsActive: { type: Boolean, required: true }
}, {
    collection: 'post'
});

const Post = mongoose.model('post', Posts);

module.exports = Post;

