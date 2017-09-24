const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber', {useMongoClient: true});
}

app.use(bodyParser.json());
routes(app);
app.use((err, req, res, next) => {
    if(err) res.status(422).send({
        error: err.message
    });
    console.log(err.message);
});

module.exports = app;