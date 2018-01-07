
require('dotenv').config(); // Load enironment variables for google maps api
var API_KEY = process.env.API_KEY;

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var ejs = require('ejs');
var flash    = require('connect-flash');
var bodyParser = require('body-parser')

var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var express = require('express');
var app = express();

app.use(passport.initialize());
app.use(bodyParser());
app.use(flash());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ng_geo');
var db = mongoose.connection;

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String
});
userSchema.methods.validPassword = function(password) {
    return (password == this.password);
};
var User = mongoose.model('User', userSchema);
var bob = new User({username: 'bob', password: 'bob'});
bob.save();

// set the view engine of the express app to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'));

var hostname = '127.0.0.1';
var port = 8080;

app.get('/', function(req, res) {
  res.render('login');
});

app.get('/index', function(req, res) {
    res.render('index', {API_KEY: API_KEY});
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failreRedirect: '/',
    failureFlash: true
}));

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log("wrong user");
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        console.log("wrong password");
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
