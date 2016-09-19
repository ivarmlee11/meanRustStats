var CronJob = require('cron').CronJob
var request = require('request')
var PlayerModel = require('../models/PlayerModel')
var apiKey = process.env.API_URL

var killDeathRatio = function (kills, deaths) {
  if (deaths === 0) {
    return kills
  } else {
    return kills / deaths
  }
}

var getRustStats = new CronJob({
  cronTime: '27 13 * * *',
  onTick: function () {
    console.log('cron.onTick() initiated')
    request(apiKey, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var parsedBody = JSON.parse(body)
        var playerArray = []
        console.log('we\'re in the Cron Update')
        for (var i = 0; i < parsedBody.players.length; i++) {
          var deathCount = (parseInt(res.data.players[i].bear) +
                            parseInt(res.data.players[i].bearTrap) +
                            parseInt(res.data.players[i].bleedings) +
                            parseInt(res.data.players[i].cold) +
                            parseInt(res.data.players[i].drowning) +
                            parseInt(res.data.players[i].explosion) +
                            parseInt(res.data.players[i].fall) +
                            parseInt(res.data.players[i].fireball) +
                            parseInt(res.data.players[i].fireballSmall) +
                            parseInt(res.data.players[i].floorSpikes) +
                            parseInt(res.data.players[i].heat) +
                            parseInt(res.data.players[i].hunger) +
                            parseInt(res.data.players[i].landmine) +
                            parseInt(res.data.players[i].poison) +
                            parseInt(res.data.players[i].radiations) +
                            parseInt(res.data.players[i].rocketBasic) +
                            parseInt(res.data.players[i].rocketHv) +
                            parseInt(res.data.players[i].players) +
                            parseInt(res.data.players[i].suicides) +
                            parseInt(res.data.players[i].thirst) +
                            // parseInt(res.data.players[i].sleepers) +
                            parseInt(res.data.players[i].wolf))
          var kd = killDeathRatio(parsedBody.players[i].kills, deathCount)
          // var totalKills = parseInt(parsedBody.players[i].sleepers) + parseInt(parsedBody.players[i].kills);
          playerArray.push({
            name: parsedBody.players[i].playerName,
            kills: parsedBody.players[i].kills,
            deaths: deathCount,
            kd: kd,
            sleepKills: parsedBody.players[i].sleepers
            // totalKills: totalKills
          })
        };

        playerArray.forEach(function (item) {
          var query = { name: item.name }
          var update = { kills: item.kills,
                          deaths: item.deaths,
                          kd: item.kd,
                          sleepKills: item.sleepKills
                          // totalKills: item.totalKills
                        }
          var options = { upsert: true, new: true, setDefaultsOnInsert: true }

          PlayerModel.findOneAndUpdate(query, update, options, function (error, result) {
            console.log('PlayerModel updated')
            if (error) return
          })
        })
      };
    })
  },
  start: false,
  timeZone: 'America/Los_Angeles'
})
getRustStats.start()
