var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  kills: Number,
  deaths: Number,
  kd: String,
  sleepKills: Number
});

playerSchema.methods.kdRatio = function() {
  return this.name + " has a " +  this.kills/this.deaths + " Kill Death ratio.";
};

module.exports = mongoose.model('PlayerModel', playerSchema);