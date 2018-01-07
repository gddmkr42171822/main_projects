
require('dotenv').config(); // Load enironment variables for google maps api
var API_KEY = process.env.API_KEY;

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var ejs = require('ejs');
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'));

var hostname = '127.0.0.1';
var port = 8080;

app.get('/', function(req, res) {
  res.render('index', {API_KEY: API_KEY});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
