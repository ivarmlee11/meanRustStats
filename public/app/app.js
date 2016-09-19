angular.module('myApp', ['MyCtrls', 'MyFactories', 'MyServices', 'ui.router'])
.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/views/home.html',
    controller: 'HomeCtrl'
  })

  $locationProvider.html5Mode(true)
})
