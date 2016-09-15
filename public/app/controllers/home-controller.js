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
        height: 450,
        donut: true,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,

        pie: {
            startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
            endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
        },
        duration: 500,
        legend: {
            margin: {
                top: 5,
                right: 140,
                bottom: 5,
                left: 0
            }
        }
    }
  };

  $scope.data = [
      {
          key: "One",
          y: 5
      },
      {
          key: "Two",
          y: 2
      },
      {
          key: "Three",
          y: 9
      },
      {
          key: "Four",
          y: 7
      },
      {
          key: "Five",
          y: 4
      },
      {
          key: "Six",
          y: 3
      },
      {
          key: "Seven",
          y: .5
      }
  ];

  var d3PlayerStatsReqObj = {
    url: '/updateD3',
      method: 'GET'
    };
    $http(d3PlayerStatsReqObj).then(function success(res) {
      d3UpdateArray = res.data;
      console.log(' sorted?');
      console.log(d3UpdateArray);

      $scope.data = [
      {
          key: d3UpdateArray[0].name,
          y: 5
      },  
      {
          key: "Two",
          y: 2
      },
      {
          key: "Three",
          y: 9
      },
      {
          key: "Four",
          y: 7
      },
      {
          key: "Five",
          y: 4
      },
      {
          key: "Six",
          y: 3
      },
      {
          key: "Seven",
          y: .5
      }
    ];
    }, function error(res) {
      console.log(res);
  });

}]);