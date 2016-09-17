var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var request = require('request');
var getRustStats = require('./helpers/cronJob.js');
var updatePlayerStats = require('./helpers/update.js').updatePlayerStats;

var PlayerModel = require('./models/PlayerModel');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/myDb');

app.get('/getPlayerStats', function(req,res) {
  PlayerModel.find({name: new RegExp('^' + req.query.name + '$', "i")}, function(err, player) {
    if (err) throw err;
    console.log(player + ' found server side');
    res.send(player);
  });
});

app.get('/updateD3', function(req, res) {
  PlayerModel.find({}).sort({kills: -1}).exec(function(err, players) {
    var playerStats = [];

    players.forEach(function(player) {
      playerStats.push(player);
    });

    res.send(playerStats);  
  });
});

app.post('/postStatsOnPageOpen', function(req, res) {
  updatePlayerStats(req);
});

app.listen(PORT, function() {
  console.log('app listening on port:', PORT);
});