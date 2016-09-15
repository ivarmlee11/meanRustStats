var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  kills: Number,
  deaths: Number,
  kd: String,
  sleepKills: Number
},
{
  timestamps: true
});

module.exports = mongoose.model('PlayerModel', playerSchema);