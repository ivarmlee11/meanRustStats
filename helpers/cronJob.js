var CronJob = require('cron').CronJob;
var request = require('request');
var PlayerModel = require('../models/PlayerModel');

var getRustStats = new CronJob({
  cronTime: '50 11 * * *',
  onTick: function() {
    console.log('cron.onTick() initiated')
    request('http://pwnserver.apmnerdery.com:8888/getPlayersGlobalStats', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('resp 200')
        var parsedBody = JSON.parse(body);
        var playerArray = [];
        console.log('we\'re in the Cron updatePlayerFunction');

        for (var i = 0; i < parsedBody.players.length; i++) {
          var deathCount = (parseInt(parsedBody.players[i].bear) + 
                            parseInt(parsedBody.players[i].bearTrap) + 
                            parseInt(parsedBody.players[i].bleedings) + 
                            parseInt(parsedBody.players[i].cold) + 
                            parseInt(parsedBody.players[i].drowning) + 
                            parseInt(parsedBody.players[i].explosion) + 
                            parseInt(parsedBody.players[i].fall) + 
                            parseInt(parsedBody.players[i].fireball) + 
                            parseInt(parsedBody.players[i].fireballSmall) + 
                            parseInt(parsedBody.players[i].floorSpikes) + 
                            parseInt(parsedBody.players[i].heat) + 
                            parseInt(parsedBody.players[i].hunger) + 
                            parseInt(parsedBody.players[i].landmine) + 
                            parseInt(parsedBody.players[i].poison) + 
                            parseInt(parsedBody.players[i].radiations) + 
                            // parseInt(parsedBody.players[i].rocketBasic) + 
                            // parseInt(parsedBody.players[i].rocketHv) + 
                            parseInt(parsedBody.players[i].suicides) + 
                            parseInt(parsedBody.players[i].thirst) + 
                            parseInt(parsedBody.players[i].wolf));

          function killDeathRatio(kills, deaths) {
            if(deaths === 0) {
              return kills;
            }else{
              return kills/deaths;
            }
          };

          var kd = killDeathRatio(parsedBody.players[i].kills, deathCount);
      
          playerArray.push({
            name: parsedBody.players[i].playerName,
            kills: parsedBody.players[i].kills,
            deaths: deathCount,
            kd: kd,
            sleepKills: parsedBody.players[i].sleepers
          });
        }; 

        playerArray.forEach(function(item) {
          var query = { name: item.name};
          var update = { kills: item.kills,
                          deaths: item.deaths,
                          kd: item.kd,
                          sleepKills: item.sleepKills
                        };
          var options = { upsert: true, new: true, setDefaultsOnInsert: true };

          // Find the document
          PlayerModel.findOneAndUpdate(query, update, options, function(error, result) {
            console.log('PlayerModel updated');
            if (error) return;
          });
        });
      };
    });
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
getRustStats.start();