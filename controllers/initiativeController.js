const express = require('express');
const mongoose = require('mongoose');
const initiative = mongoose.model('Initiative');
const crisis = mongoose.model('Crisis');
const user = mongoose.model('User');
var router = express.Router();

router.get('/', (req, res) => {
    res.json('just checking initiatives')
});

router.get('/allCrisis', (req, res) => {
    try {
        crisis.find({}, function(err, docs) {
            if (!err) {
                res.json(docs);
            } else {
                res.json({
                    errorMessage: 'Can not fetch Crisis. Contact Admin'
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
})


router.post('/createInitiative', (req, res) => {
    insertInitiative(req, res);
});

router.post('/addUserToInitiative', (req, res) => {
    const filter = { _id: mongoose.Types.ObjectId(req.body.initiativeId) };
    const update = { signedUpVolunteers: req.body.userId };
    initiative.findOneAndUpdate(filter, { $push: update }, { upsert: true }, (err, docs) => {
        if (!err) {
            const filter2 = { _id: mongoose.Types.ObjectId(req.body.userId) };
            const update2 = { signedUpInitiatives: req.body.initiativeId };
            user.findOneAndUpdate(filter2, { $push: update2 }, { upsert: true }, (err2, docs2) => {
                if (!err2) {
                    res.json({
                        successMessage: 'Successfully added user to initiative.'
                    })
                } else {
                    res.json({
                        errorMessage: 'Unable to add user to initiative. contact admin.'
                    });
                }
            });
        } else {
            res.json({
                errorMessage: 'Unable to add user to initiative. contact admin.'
            });
        }
    });

})

router.post('/fetchMyInitiative', (req, res) => {
    const filter = { 'metaData.createdBy': req.body.userId }
    initiative.find(filter, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            res.json({
                errorMessage: 'Unable to fetch initiatives by user.'
            })
        }
    })
})

router.get('/getInitiative:initiativeId', (req, res) => {
    var id = mongoose.Types.ObjectId(req.params.initiativeId)
    initiative.findOne({ _id: id }, function(err, docs) {
        if (!err) {
            res.json(docs);
        } else {
            var response = {
                errorMessage: "Could not find your initiative"
            }
            res.json(response);
        }
    });
})

router.get('/fetchInitiatives', (req, res) => {
    try {
        initiative.find({}, function(err, docs) {
            if (!err) {
                res.json(docs);
            } else {
                res.json({
                    errorMessage: 'Can not fetch Initiatives. Contact Admin'
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
})

router.put('/updateInitiative', (req, res) => {
    const filter = { _id: mongoose.Types.ObjectId(req.body.initiativeId) };
    const update = {...req.body };
    initiative.findOneAndUpdate(filter, update, function(err, docs) {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Wrong initiative credentials: ' + err);
            res.json({
                errorMessage: "Invalid request. Try again."
            });
        }
    })
})

function insertInitiative(req, res) {
    var newInitiative = new initiative();
    newInitiative.name = req.body.name;
    newInitiative.crisis = {
        name: req.body.crisis.name,
        tags: req.body.crisis.tags,
        details: req.body.crisis.details
    };
    newInitiative.volunteersRequired = req.body.volunteersRequired;
    newInitiative.description = req.body.description ? req.body.description : '';
    newInitiative.metaData = {
        dateInitiated: new Date(),
        createdBy: req.body.userId,
    };
    newInitiative.tags = req.body.tags ? req.body.tags : null;
    newInitiative.save((err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            res.json({
                errorMessage: 'Can not create initiative. Contact Admin.'
            })
        }
    })

}

module.exports = router;