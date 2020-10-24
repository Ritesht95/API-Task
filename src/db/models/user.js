const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    Name: { type: String, required: true, trim: true },
    UserType: { type: Boolean, required: true },
    Email: { type: String, required: true, lowercase: true, trim: true },
    Password: { type: String, required: true, minlength: [6, 'Password must be atleast 6 characters long.'] },
    Token: { type: String },
    CreatedOn: { type: String },
    ModifiedOn: { type: String }
}, {
    collection: 'users'
});

const User = mongoose.model('users', Users);

module.exports = User;