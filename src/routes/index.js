const PostsRoute = require('./post.route');
const UserRoute = require('./user.route');

class APIRoutes {
    constructor(app) {
        const UserRoutes = require('./user.route');
        const PostRoutes = require('./post.route');
        new UserRoutes(app);
        new PostRoutes(app);
    }
}

module.exports = APIRoutes;