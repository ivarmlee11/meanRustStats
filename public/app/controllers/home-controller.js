angular.module('Home', ['nvd3'])
.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

  function killDeathRatio(kills, deaths) {
    if(deaths === 0) {
      return kills;
    }else{
      return kills/deaths;
    }
  };

  $scope.playerStats = {};
  $scope.searchTerm = '';

  var playerArray = [];
  var d3UpdateArray = [];

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
    // console.log(playerArray);
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

  $scope.options = {
    chart: {
      type: 'pieChart',
      height: 600,
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: true,
      duration: 500,
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
  
  var d3PlayerStatsReqObj = {
    url: '/updateD3',
    method: 'GET'
  };

  $http(d3PlayerStatsReqObj).then(function success(res) {
    d3UpdateArray = res.data;

    $scope.data = [];

    for (var i = 0; i < 31; i++) {
      $scope.data.push({key: d3UpdateArray[i].name + ,
                        y: d3UpdateArray[i].kills + d3UpdateArray[i].sleepKills})
    };

  }, function error(res) {
    console.log(res);
  });

}]);