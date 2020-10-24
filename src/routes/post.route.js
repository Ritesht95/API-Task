const post = require('../controllers/posts.controller');
const jwt = require('jsonwebtoken');
const userModel = require('../db/models/user');

class PostsRoute {
    constructor(router) {
        router.get('/api/post', this.verifyUser, post.getPosts);
        router.post('/api/post', this.verifyUser, post.createPost);
        router.put('/api/post/:postId', this.verifyUser, post.updatePost);
        router.delete('/api/post/:postId', this.verifyUser, post.deletePost);
    }

    /**
     * @method verifyUser
     * @param {*} req 
     * @param {*} res
     * @param {*} next
     * @description This method works as middleware to verify user login
     */
    verifyUser(req, res, next) {
        if (req.headers['authorization']) {
            const token = req.headers['authorization'];
            jwt.verify(token, 'jwt_secret', (err, decoded) => {
                if (err) {
                    res.status(403).send({ Status: 'Failure', Message: 'Wrong Token', Error: err});
                } else {
                    userModel.findOne({_id: decoded.id, Token: token }, (err, result) => {
                        if (err) {
                            res.status(403).send({ Status: 'Failure', Message: 'Wrong Token', Error: err});
                        } else {        
                            req.userType = decoded.userType;
                            req.userId = decoded.id;
                            return next();
                        }
                    })
                }
            });
        } else {
            res.status(403).send({ Status: 'Failure', Message: 'Auth Token Missing', Error: {}});
        }
    }

    /**
     * @method verifyUser
     * @param {*} req 
     * @param {*} res
     * @param {*} next
     * @description This method works as middleware to verify user as admin
     */
    verifyAdmin(req, res, next) {
        if (req.userType) {
            return next();
        } else {
            res.status(403).send({ Status: 'Failure', Message: 'You are not authorized to perform this operation.', Error: {}});
        }
    }
}

module.exports = PostsRoute;