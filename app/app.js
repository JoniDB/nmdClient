'use strict';

var angular = require('angular');
require('angular-route');
require('angular-material');
var _templateBase = './templates';

var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngMaterial']);

var osc = require('osc');
app.constant('osc',osc);

var index = require('./modules/index');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: _templateBase + '/index.html',
    controller: 'indexController',
  });

  $routeProvider.when('/memory', {
    templateUrl: _templateBase + '/memory.html',
    controller: 'memoryController',
  });

  $routeProvider.when('/cards', {
    // html alsoo works directly
    templateUrl: _templateBase + '/cards.html',
    controller: function($scope) {
      $scope.imagePath = 'https://material.angularjs.org/latest/img/washedout.png';
    }
  });

  $routeProvider.otherwise({ redirectTo: '/' });

}]);
