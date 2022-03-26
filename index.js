require('./models/db');
var cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser')
const userController = require('./controllers/userController');
var app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Express server started at port: 3000');
});
app.use(cors());
app.use('/user', userController);
app.get('/', (req, res) => res.send('Home Page Route'));