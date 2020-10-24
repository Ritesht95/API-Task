const user = require('../controllers/user.controller');

class UserRoute {
    constructor(router) {
        router.post('/api/user/registration', user.userRegistration);
        router.post('/api/user/login', user.userLogin);
    }
}

module.exports = UserRoute;