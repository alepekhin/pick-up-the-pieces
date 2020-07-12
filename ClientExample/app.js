require('dotenv').config();

var request = require('request');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Use Passport with OpenId Connect strategy to
// authenticate users with OneLogin
var passport = require('passport')
var OidcStrategy = require('passport-openidconnect').Strategy

var index = require('./routes/index');
var users = require('./routes/users');

//  acr_values: 'onelogin:nist:level:1:re-auth'

// Configure the OpenId Connect Strategy
// with credentials obtained from OneLogin
passport.use(new OidcStrategy({
  issuer: process.env.OIDC_BASE_URI,
  clientID: process.env.OIDC_CLIENT_ID,
  clientSecret: process.env.OIDC_CLIENT_SECRET,
  authorizationURL: `${process.env.OIDC_BASE_URI}/auth`,
  userInfoURL: `${process.env.OIDC_BASE_URI}/me`,
  tokenURL: `${process.env.OIDC_BASE_URI}/token`,
  callbackURL: process.env.OIDC_REDIRECT_URI,
  passReqToCallback: true
},
function(req, issuer, userId, profile, accessToken, refreshToken, params, cb) {

  console.log('issuer:', issuer);
  console.log('userId:', userId);
  console.log('accessToken:', accessToken);
  console.log('refreshToken:', refreshToken);
  console.log('params:', params);

  console.log('---------------------------')
  console.log('id_token'+params.id_token)
  console.log('---------------------------')

  req.session.accessToken = accessToken;
  req.session.id_token = params.id_token;

  return cb(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport requires session to persist the authentication
// so were using express-session for this example
app.use(session({
  secret: 'secret squirrel',
  resave: false,
  saveUninitialized: true
}))

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware for checking if a user has been authenticated
// via Passport and OneLogin OpenId Connect
function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      next();
  } else{
      res.redirect("/");
  }
}

app.use('/', index);
// Only allow authenticated users to access the /users route
app.use('/users', checkAuthentication, users);

// Initiates an authentication request with OneLogin
// The user will be redirect to OneLogin and once authenticated
// they will be returned to the callback handler below
app.get('/login', passport.authenticate('openidconnect', {
  successReturnToOrRedirect: "/",
  scope: 'profile'
}),
function(req,res) {
  console.log('-----------------------------')
  console.log('res login:'+simpleStringify(res))
  console.log('-----------------------------')

}
);

// Callback handler that OneLogin will redirect back to
// after successfully authenticating the user
app.get('/oauth/callback', passport.authenticate('openidconnect', {
  callback: true,
  successReturnToOrRedirect: '/users',
  failureRedirect: '/'
})
)

function simpleStringify (object){
  var simpleObject = {};
  for (var prop in object ){
      if (!object.hasOwnProperty(prop)){
          continue;
      }
      if (typeof(object[prop]) == 'object'){
          continue;
      }
      if (typeof(object[prop]) == 'function'){
          continue;
      }
      simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

// Destroy both the local session and
// revoke the access_token at OneLogin
app.get('/logout', function(req, res){
  res.redirect(`http://localhost:4000/oidc/session/end?post_logout_redirect_uri=http://localhost:3000&id_token_hint=${req.session.id_token}`)
});

// error handler
app.use(function(err, req, res, next) {
  if (err.status == 502) {
    res.redirect(`http://localhost:4000/oidc/session/end?post_logout_redirect_uri=http://localhost:3000&id_token_hint=${req.session.id_token}`)
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
