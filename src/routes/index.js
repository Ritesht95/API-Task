const UserRoute = require('./user.route');

class APIRoutes {
    constructor(app) {
        const UserRoutes = require('./user.route');
        new UserRoutes(app);
    }
}

module.exports = APIRoutes;