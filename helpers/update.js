var PlayerModel = require('../models/PlayerModel')
var kills = 0
var deaths = 0
var counter = 0
exports.updatePlayerStats = function (array) {
  array.body.forEach(function (item) {
    kills += parseInt(item.kills)
    deaths += parseInt(item.deaths)
    var query = { name: item.name }
    var update = { kills: item.kills,
                    deaths: item.deaths,
                    kd: item.kd,
                    sleepKills: item.sleepKills
                    // totalKills: item.totalKills
                  }
    var options = { upsert: true, new: true, setDefaultsOnInsert: true }
    counter += 1

    PlayerModel.findOneAndUpdate(query, update, options, function (error, result) {
      if(error){
        console.log('Something went wrong saving the player')
      }
      if (error) return
    })
  })
  console.log(kills + ' kills')
  console.log(counter + ' players saved')
  console.log(deaths + ' deaths')
  var kills = 0
  var deaths = 0
  var counter = 0
}
