// BASE SETUP
// =============================================================================

// Require dependencies
var path = require('path');
var express    = require('express');      // call express
var app        = express();                 // define our app using express
var printer    = require('./printer.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Point static path to dist
//app.use(express.static(path.join(__dirname, 'dist')));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//Carregar imatge abans per a estalviar temps
printer.getBaseImage(function(){});

app.use('/print', router);


// Catch all other routes and return the index file
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});*/


// START THE SERVER
// =============================================================================
app.listen(8082);
console.log('Magic happens on port ' + 8082);