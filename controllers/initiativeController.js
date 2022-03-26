const express = require('express');
const mongoose = require('mongoose');
const inititives = mongoose.model('Initiatives');
var router = express.Router();

router.get('/', (req, res) => {
    res.json('just checking user')
});

router.post('/add', (req, res) => {
    insertUser(req, res);
});