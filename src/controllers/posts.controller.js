const postModel = require('../db/models/post');
class Post {
    getPosts(req, res) {
        let queryObj;
        if (req.userType) {
            queryObj = {};
        } else {
            queryObj = { CreatedBy: req.userId };
        }
        postModel.find(queryObj, (err, result) => {
            if (err) {
                res.status(500).send({ Status: 'Failure', Message: 'Failed to retrieve posts.', Error: errr });
            } else {
                if (result && result.length) {
                    res.status(200).send({ Status: 'Success', Message: 'Posts retrieved succesfully.', Data: result });
                } else {
                    res.status(200).send({ Status: 'Success', Message: 'No posts found', Data: result });
                }
            }
        });
    }

    createPost(req, res) {
        const postData = req.body;
        postData.CreatedBy = req.userId;
        const post = new postModel(postData);
        post.save((err, result) => {
            if (err) {
                res.status(500).send({ Status: 'Failure', Message: 'Failed to create post.', Error: err });                
            } else {
                result = result.toObject();
                delete result.__v;
                res.status(200).send({ Status: 'Success', Message: 'Post created succesfully.', Data: result });
            }
        });
    }

    updatePost(req, res) {
        const userId = req.userId;
        const postId = req.params.postId;
        const postData = req.body;
        let queryObj;
        if (req.userType) {
            queryObj = { _id: postId };
        } else {
            queryObj = {$and: [{ _id: postId, CreatedBy: userId }]};
        }
        postModel.updateOne(queryObj, postData, {}, (err, result) => {
            if (err) {
                res.status(500).send({ Status: 'Failure', Message: 'Failed to update post.', Error: err });                
            } else {

                if (result.n && result.n > 0 || result.nModified && result.nModified > 0) {
                    res.status(200).send({ Status: 'Success', Message: 'Post updated succesfully.', Data: {} });      
                } else {
                    res.status(404).send({ Status: 'Failure', Message: 'Invalid postId', Error: err }); 
                }
            }
        });
    }

    deletePost(req, res) {
        const userId = req.userId;
        const postId = req.params.postId;
        let queryObj;
        if (req.userType) {
            queryObj = { _id: postId };
        } else {
            queryObj = {$and: [{ _id: postId, CreatedBy: userId }]};
        }
        postModel.deleteOne(queryObj, (err, result) => {
            if (err) {
                res.status(500).send({ Status: 'Failure', Message: 'Failed to delete post.', Error: err });                
            } else {
                if (result.n && result.n > 0 || result.deletedCount && result.deletedCount > 0) {
                    res.status(200).send({ Status: 'Success', Message: 'Post deleted succesfully.', Data: {} });   
                } else {
                    res.status(404).send({ Status: 'Failure', Message: 'Invalid postId', Error: err }); 
                }
            }
        });
    }
}

module.exports = new Post();