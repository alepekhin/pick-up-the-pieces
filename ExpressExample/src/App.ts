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
    res.send( "Hello world!" );
} );

app.get('/hbs', (req, res, next) => {
  res.render('home', { layout: 'default', template: 'home-template' });
});

app.get('/oauth/callback', (req, res, next) => {
  res.render('home', { layout: 'default', template: 'home-template' });
});



