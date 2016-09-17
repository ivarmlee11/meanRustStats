var PlayerModel = require('../models/PlayerModel')

exports.updatePlayerStats = function (array) {
  array.body.forEach(function (item) {
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
}
