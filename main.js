// BASE SETUP

var express     = require('express')
var app         = express()
var path        = require('path');
const port      = process.env.PORT || 3000;
const fs        = require('fs');

// There is a special routing method which is not derived from any HTTP method. 
// This method is used for loading middleware functions at a path for all request methods.
// app.all()

//set our default template engine to "ejs"
// which prevents the need for using file extensions. (pug, ejs...)
app.set('view engine', 'ejs');

//set views for 505, 404 and other view pages
app.set('views', path.join(__dirname, 'view'));

//set path for static files (css, images...)
app.use(express.static(path.join(__dirname, 'public')));

/*var router = express.Router();

router.get('/', function (req, res){
  console.log("test");
  res.render('unownpuzzle');
});
*/

app.get('/', function(req, res){
  res.render('unownpuzzle');
});


app.get('/memory/', function(req, res){
  res.render('memory');
});

app.get('/puzzle/', function(req, res){
  res.render('unownpuzzle');
});

app.get('/decoderAgatha/', function(req, res){
  res.render('decoderAgatha');
});

//ERRORS:
//mount the app requests with the functions
app.use(function (err, req, res, next){
    //log it
    if (!module.parent) console.error(err.stack);

    //error page
    res.status(500).render('5xx');
});

//last middleware response: 404 page error
app.use(function(req, res, next){
    res.status(404).render('404', { url: req.originalUrl });
});

// START THE SERVER
if(!module.parent) {
  app.listen(port);
  console.log("Server started at the port: "+port);
}
