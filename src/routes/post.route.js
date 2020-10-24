const post = require('../controllers/posts.controller');
const jwt = require('jsonwebtoken');

class PostsRoute {
    constructor(router) {
        router.get('/api/post', this.verifyUser, post.getPosts);
        router.post('/api/post', this.verifyUser, post.createPost);
        router.put('/api/post/:postId', this.verifyUser, post.updatePost);
        router.delete('/api/post/:postId', this.verifyUser, post.deletePost);
    }

    verifyUser(req, res, next) {
        if (req.headers['authorization']) {
            const token = req.headers['authorization'];
            jwt.verify(token, 'jwt_secret', (err, decoded) => {
                if (err) {
                    res.status(403).send({ Status: 'Failure', Message: 'Wrong Token', Error: err});
                } else {
                    req.userType = decoded.userType;
                    req.userId = decoded.id;
                    return next();
                }
            });
        } else {
            res.status(403).send({ Status: 'Failure', Message: 'Auth Token Missing', Error: {}});
        }
    }

    verifyAdmin(req, res, next) {
        if (req.userType) {
            return next();
        } else {
            res.status(403).send({ Status: 'Failure', Message: 'You are not authorized to perform this operation.', Error: {}});
        }
    }
}

module.exports = PostsRoute;