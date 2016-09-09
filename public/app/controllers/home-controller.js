angular.module('Home', [])
.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.loading = false;

  

  function killDeathRatio(kills, deaths) {
    if(deaths === 0) {
      return kills;
    }else{
      return kills/deaths;
    }
  };

  var playerStats = {
    url: 'http://pwnserver.apmnerdery.com:8888/getPlayersGlobalStats',
    method: 'GET',
  };

  $http(playerStats).then(function(res) {
    var playerArray = [];
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
    var data = playerArray;
    console.log('post getting called twice');
    $http.post('/postStats', data);
  }, function error(res) {
    console.log(res);
  });

  // $scope.search = function() {
  //   // var data = $scope.playerArray;
  //   $http.post('/postStats', data);
  // };

}]);