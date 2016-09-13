var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var request = require('request');
var CronJob = require('cron').CronJob;
//cronJob helper function that updates player
//state once a day at some specified time
var getRustStats = require('./helpers/cronJob.js');
//function that updates plyerStats when the client
//opens the page
var updatePlayerStats = require('./helpers/update.js').updatePlayerStats;

var PlayerModel = require('./models/PlayerModel');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myDb');

// When this redirect is enabled the response object I get from the 
// GET request for player stats is HTML
// app.get('/*', function(req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });

app.get('/getPlayerStats', function(req,res) {
  PlayerModel.find({name: req.query.name}, function(err, player) {
    if (err) throw err;
    console.log(player + ' found server side');
    res.send(player);
  });
});

app.post('/postStatsOnPageOpen', function(req, res) {
  updatePlayerStats(req);
});

app.listen(PORT, function() {
  console.log('app listening on port:', PORT);
});