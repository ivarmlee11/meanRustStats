angular.module('MyFactories', ['ngResource'])

.factory('FilmsFactory', ['$resource', function($resource) {
  return 'Factory injection works';
}])
