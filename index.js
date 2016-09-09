var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var request = require('request');
var CronJob = require('cron').CronJob;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myDb');

var PlayerModel = require('./models/PlayerModel');

function getPlayerStats() {
  request('http://pwnserver.apmnerdery.com:8888/getPlayersGlobalStats', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      // find and update
    };
  });
};

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/postStats', function(req, res) {
  req.body.forEach(function(player) {
    PlayerModel.create({
      name: player.name,
      kills: player.kills,
      deaths: player.deaths,
      kd: player.kd,
      sleepKills: player.sleepKills
    },
    function(err, player) {
      if (err) {
        return console.log(err.message);
      };
      console.log(player);
    });
  });
  console.log('the post route hit');
});

var getRustStats = new CronJob({
  cronTime: '00 18 15 * * 1-5',
  onTick: function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
     getPlayerStats();
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
getRustStats.start();

app.listen(PORT, function() {
  console.log('app listening on port:', PORT);
});