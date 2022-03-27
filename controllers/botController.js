const express = require('express');
const axios = require('axios');

router.post('/getBotReply', (req, res) => {
    axios.post('http://ec2-44-203-171-79.compute-1.amazonaws.com:5000/chatbot', req.body).then(
        reply => {
            res.json(reply);
        }
    ).catch(err => {
        res.json(err);
    })
});

router.post('/getTags', (req, res) => {
    axios.post('http://ec2-44-203-171-79.compute-1.amazonaws.com:5000/getTags', req.body).then(
        reply => {
            res.json(reply);
        }
    ).catch(err => {
        res.json(err);
    })
});

module.exports = router;