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

function updatePlayerStats(object) {
  object.body.forEach(function(item) {
    var query = { name: item.name};
    var update = { kills: item.kills,
                    deaths: item.deaths,
                    kd: item.kd,
                    sleepKills: item.sleepKills
                  };
    var options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    PlayerModel.findOneAndUpdate(query, update, options, function(error, result) {
        if (error) return;
    });
  });
};

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

var getRustStats = new CronJob({
  cronTime: '00 08 18 * * 1-5',
  onTick: function() {
    // put the request to the external site back in
    // pass in the object i get from it to the function below
    // updatePlayerStats();
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
getRustStats.start();

app.listen(PORT, function() {
  console.log('app listening on port:', PORT);
});