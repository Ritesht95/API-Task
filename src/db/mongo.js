const mongoose = require('mongoose');

const connURL = 'mongodb://127.0.0.1:27017';
const dbName = 'posts-db';

mongoose.connect(`${connURL}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});