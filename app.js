require('./models/db');
var cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser')
const userController = require('./controllers/userController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Express server started at port: 3000');
});
app.use(cors());
app.use('/user', userController);
app.use('/initiatives', initiativeController);

app.get('/', (req, res) => res.send('Home Page Route'));

app.use('/api-docs', swaggerUi.serve);

app.get('/api-docs', swaggerUi.setup(swaggerDocument));