import express from "express";
import hbs from 'express-handlebars';

export const app = express();

app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  partialsDir: 'dist/views/partials'
}));

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
  res.redirect('http://localhost:8080/auth/realms/demo/protocol/openid-connect/auth?client_id=demo-backend&redirect_uri=http://localhost:3000/secured&response_type=code&scope=openid')
  // send( "Hello world!" );
});

app.get('/hbs', (req, res, next) => {
  console.log('inside hbs:'+req.headers)
  res.render('home', { layout: 'default', template: 'home-template' });
});

app.get('/secured', (req, res, next) => {
  console.log('inside secured:'+JSON.stringify(req.headers))
  res.render('home', { layout: 'default', template: 'home-template' });
});



