var express = require('express');
var users = require('./routes/users');
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');

var expressReactViews = require("express-react-views");
var options = {beautify: true};
app.engine("jsx", expressReactViews.createEngine(options));

// routers setup
var routers = require('./routes').routers;
routers.map(app);

module.exports = app;
