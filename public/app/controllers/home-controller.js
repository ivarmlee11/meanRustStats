angular.module('Home', ['nvd3', 'ngResource'])

.controller('HomeCtrl', ['$scope', '$http', 'FilmsFactory',
 function($scope, $http, FilmsFactory) {

  console.log(FilmsFactory);

  var killDeathRatio = function(kills, deaths) {
    if(deaths === 0) {
      return kills;
    }else{
      return kills/deaths;
    }
  };

  $scope.playerStats = {};
  $scope.searchTerm = '';
  $scope.totalKills = 0;
  $scope.totalDeaths = 0;
  $scope.trackedPlayers = 0;
  $scope.searchTermFound = true;
  $scope.data = [];

  var playerArray = [];
  var d3UpdateArray = [];

// barricadeMetal: "0",
// barricadeWood: "0",
// barricadeWoodwire: "0",
// bear: "0",
// bearTrap: "0",
// bleedings: "0",
// campfire: "0",
// cold: "0",
// drowning: "0",
// explosion: "0",
// fall: "0",
// fireball: "0",
// fireballSmall: "0",
// floorSpikes: "0",
// heat: "0",
// hunger: "0",
// idPlayer: "76561198071866912",
// kills: "35",
// landmine: "0",
// lockCode: "0",
// playerName: "Walter Melon",
// players: "9",
// poison: "0",
// radiations: "0",
// rocketBasic: "0",
// rocketHv: "0",
// sleepers: "2",
// suicides: "0",
// thirst: "0",
// wallExternalHighStone: "0",
// wolf: "0"

  var serverStatsReqObj = {
    url: 'http://pwnserver.apmnerdery.com:8888/getPlayersGlobalStats',
    method: 'GET'
  };

  $http(serverStatsReqObj).then(function success(res) {
    for (var i = 0; i < res.data.players.length; i++) {
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
                        parseInt(res.data.players[i].wolf));
          
      var kd = killDeathRatio(res.data.players[i].kills, deathCount);
      // var totalKills = parseInt(res.data.players[i].sleepers) + parseInt(res.data.players[i].kills);
      playerArray.push({
        name: res.data.players[i].playerName,
        kills: res.data.players[i].kills,
        deaths: deathCount,
        kd: kd,
        sleepKills: res.data.players[i].sleepers
        // totalKills: totalKills
      });
    };
    $http.post('/postStatsOnPageOpen', playerArray); 
  }, function error(res) {
    console.log(res);
  });

  var d3PlayerStatsReqObj = {
    url: '/updateD3',
    method: 'GET'
  };

  $http(d3PlayerStatsReqObj).then(function success(res) {
    d3UpdateArray = res.data;
    console.log(d3UpdateArray);
    $scope.trackedPlayers += d3UpdateArray.length;

    for (var i = 0; i < 11; i++) {
      $scope.data.push({key: d3UpdateArray[i].name,
                        y: d3UpdateArray[i].kills});
    };
    for (var j = 0; j < d3UpdateArray.length; j++) {
      $scope.totalKills += d3UpdateArray[j].kills;
      $scope.totalDeaths += d3UpdateArray[j].deaths;
    };

  }, function error(res) {
    console.log(res);
  });


  $scope.$watch("searchTerm", function(newValue, oldValue) {
    var playerStatsReqObj = {
      url: '/getPlayerStats',
      method: 'GET',
      params: {name: $scope.searchTerm}
    };

    $http(playerStatsReqObj).then(function success(res) {
      if(res.data[0]) {
        $scope.searchTermFound = false;
      };
  
      $scope.playerStats = res.data[0];
    }, function error(res) {
      console.log(res);
    });
  });


  $scope.options = {
    chart: {
      type: 'pieChart',
      height: 600,
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: true,
      duration: 750,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      legend: {
        margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
        }
      }
    }
  };

}])
