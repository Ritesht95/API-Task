const userModel = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class User {
    userRegistration(req, res) {
        const userData = req.body;
        const salt = 8;
        userData.Password = bcrypt.hashSync(userData.Password, salt);
        userData.CreatedOn = new Date().getTime();
        userData.ModifiedOn = new Date().getTime();
        const user = new userModel(userData);
        user.save((err, result) => {
            if (err) {
                res.status(500).send({ Status: 'Failure', Message: 'Failed to register the user.', Error: errr });
            } else {
                res.status(200).send({ Status: 'Success', Message: 'User registered succesfully.', Data: {} });
            }
        })
    }
}

module.exports = new User();