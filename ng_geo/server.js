
require('dotenv').config(); // Load enironment variables for google maps api
var API_KEY = process.env.API_KEY;

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var ejs = require('ejs');
var flash = require('connect-flash');
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
var session = require('express-session');
var app = express();
app.use(session({ 
    secret: 'bob',
    resave: true,
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
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
  res.render('login', {message: req.flash('loginMessage')});
});
app.get('/login', function(req, res) {
    res.render('login', {message: req.flash('loginMessage')});
});

app.get('/index', isLoggedIn, function(req, res) {
    res.render('index', {API_KEY: API_KEY});
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

app.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/',
    failureFlash: true
}));

passport.use(new LocalStrategy({
    passReqToCallback : true
}, function(req, username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'Incorrect username.'));
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Incorrect password.' ));
      }
      return done(null, user);
    });
  }
));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
