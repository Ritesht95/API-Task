const user = require('../controllers/user.controller');

class UserRoute {
    constructor(router) {
        router.post('/api/user/registration', user.userRegistration);
    }
}

module.exports = UserRoute;