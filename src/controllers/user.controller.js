const userModel = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class User {

    /**
     * @method userRegistration
     * @param {*} req 
     * @param {*} res
     * @description This method is used to register the user
     */
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

    /**
     * @method userRegistration
     * @param {*} req 
     * @param {*} res
     * @description This method is used to get user loggedIn
     */
    userLogin(req, res) {
        const email = req.body.Email;
        const password = req.body.Password;
        userModel.findOne({ Email: email }, (err, result) => {
            if (err) {
                res.status(500).send({ Status: 'Failure', Message: 'Failed to login!', Error: err});
            } else {
                if (result) {
                    bcrypt.compare(password, result.Password, (err, compResult) => {
                        if (compResult === true) {
                            jwt.sign({ id: result._id, userType: result.UserType }, 'jwt_secret', async (err, token) => {
                                try {
                                    result.Token = token;
                                    let finalResult = await result.save();
                                    finalResult = finalResult.toObject();
                                    delete finalResult.Password;
                                    delete finalResult.__v;
                                    res.status(200).send({ Status: 'Sucess', Message: 'User logged in succesfully.', Data: finalResult});
                                } catch (error) {
                                    res.status(400).send({ Status: 'Failure', Message: 'Failed to login!', Error: error});
                                }
                            });
                        } else {
                            res.status(401).send({ Status: 'Failure', Message: 'Incorrect Password!', Error: err});
                        }
                    });
                } else {
                    res.status(500).send({ Status: 'Failure', Message: 'We couldn\'t find any user with entered email.', Error: err});
                }
            }
        })
    }
}

module.exports = new User();