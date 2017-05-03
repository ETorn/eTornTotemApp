// BASE SETUP
// =============================================================================

// Require dependencies
var path = require('path');
var express    = require('express');      // call express
var app        = express();                 // define our app using express
var printer    = require('./printer.js');
var cors       = require('cors');
// configure app to use bodyParser()
// this will let us get the data from a POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/src',express.static(path.join(__dirname, 'src')));
app.use('/node_modules',express.static(path.join(__dirname, 'node_modules'))); //TOFIX

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


//Carregar imatge abans per a estalviar temps
printer.getBaseImage(function(){});

require ('./server/routes/print') (router, printer);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8082');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/', router);
app.use(cors());

// Catch all other routes and return the index file
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});*/


// START THE SERVER
// =============================================================================
app.listen(8082);
console.log('Magic happens on port ' + 8082);