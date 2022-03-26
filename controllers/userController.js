const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const user = mongoose.model('User');
var router = express.Router();
const bcrypt = require('../utils/secure');
router.get('/', (req, res) => {
    res.json('just checking user')
});


router.post('/register', (req, res) => {
    console.log('trying to register');
    user.findOne({ email: req.body.email }, function(err, docs) {
        if (!err) {
            if (docs) {
                var response = {
                    message: "Email already exists"
                }
                res.json(response);

            } else {
                insertUser(req, res);
            }
        } else {
            res.json({
                errorMessage: "Some Error Occurred. Contact Admin."
            })
        }
    });
});

router.post('/login', (req, res) => {
    fetchUser(req, res);
});

router.post('/updateTags', (req, res) => {
    updateTags(req, res);
});

function insertUser(req, res) {
    console.log('inserting user in db');
    var newUser = new user();
    newUser.userType = req.body.userType;
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    bcrypt.cryptPassword(req.body.password, (err, hash) => {
        if (!err) {
            newUser.password = hash;
            newUser.gender = req.body.gender ? req.body.gender : 'NA';
            newUser.dob = req.body.dob ? req.body.dob : (null);
            newUser.mobileNumber = req.body.mobileNumber;
            newUser.save((err, doc) => {
                if (!err) {
                    var response = {
                        status: 200,
                        message: "Registered successfully."
                    }
                    res.json(response);
                } else {
                    console.log('Error during adding user: ' + err);
                }
            });
        } else {
            console.log(err);
        }
    })
}

function fetchUser(req, res) {
    user.findOne({ email: req.body.email }, function(err, docs) {
        if (!err) {
            bcrypt.comparePassword(req.body.password, docs.password, (err, cmp) => {
                if (cmp) {
                    const userRes = docs;
                    delete userRes.password;
                    res.json(userRes);
                } else {
                    console.log('Wrong Password: ' + err);
                    res.json({
                        errorMessage: "Wrong Password. Try again."
                    });
                }
            })
        } else {
            console.log('Error in retrieving user: ' + err);
            res.json({
                errorMessage: "No user found. Try again."
            });
        }
    });
}

function updateTags() {
    const filter = { email: req.body.email };
    const update = { tags: req.body.tags };
    user.findOneAndUpdate(filter, update, function(err, docs) {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Wrong user credentials: ' + err);
            res.json({
                errorMessage: "Invalid request. Try again."
            });
        }
    })
}

module.exports = router;