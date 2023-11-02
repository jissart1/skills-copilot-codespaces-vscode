// Create web server
// Start server: node comments.js
// View at: http://localhost:3000/

// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// Create express app
var app = express();

// Use middleware for POST
app.use(bodyParser.urlencoded({ extended: false }));

// Use middleware for GET
app.use(bodyParser.json());

// Set port
app.set('port', process.env.PORT || 3000);

// Set path to public directory
app.use(express.static(__dirname + '/public'));

// Set path to views directory
app.set('views', __dirname + '/views');

// Set view engine
app.set('view engine', 'ejs');

// Set path to data file
var COMMENTS_FILE = __dirname + '/data/comments.json';

// GET request to home page
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Comments App'
    });
});

// GET request to comments page
app.get('/comments', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

// POST request to comments page
app.post('/comments', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        var newComment = {
            id: Date.now(),


