angular.module('Home', [])
.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

  function killDeathRatio(kills, deaths) {
    if(deaths === 0) {
      return kills;
    }else{
      return kills/deaths;
    }
  };

  var serverStatsReqObj = {
    url: 'http://pwnserver.apmnerdery.com:8888/getPlayersGlobalStats',
    method: 'GET'
  };

  var playerArray = [];

  $scope.playerStats = {};
  $scope.searchTerm = '';

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
                        // parseInt(res.data.players[i].rocketBasic) + 
                        // parseInt(res.data.players[i].rocketHv) + 
                        parseInt(res.data.players[i].suicides) + 
                        parseInt(res.data.players[i].thirst) + 
                        parseInt(res.data.players[i].wolf));
          
      var kd = killDeathRatio(res.data.players[i].kills, deathCount);
      
      playerArray.push({
        name: res.data.players[i].playerName,
        kills: res.data.players[i].kills,
        deaths: deathCount,
        kd: kd,
        sleepKills: res.data.players[i].sleepers
      });
    };
    console.log(playerArray);
    $http.post('/postStatsOnPageOpen', playerArray); 
  }, function error(res) {
    console.log(res);
  });

  $scope.search = function() {
    var playerStatsReqObj = {
      url: '/getPlayerStats',
      method: 'GET',
      params: {name: $scope.searchTerm}
    };
    $http(playerStatsReqObj).then(function success(res) {
      console.log(res);
      $scope.playerStats = res.data[0];
    }, function error(res) {
      console.log(res);
    });
  };

}]);