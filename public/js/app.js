'use strict';

// Declare app level module which depends on filters, and services

angular.module('randomFlickrApp', ['randomFlickrApp.filters', 'randomFlickrApp.services', 'randomFlickrApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html',
        controller: MainCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);