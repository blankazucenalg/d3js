(function() {
  'use strict';

  angular
    .module('d3Js')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      /*.state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })*/
      .state('start', {
        url: '/start',
        templateUrl: 'app/start/start.html',
        controller: 'StartController',
        controllerAs: 'start'
      })
      .state('introduction', {
        url: '/introduction',
        templateUrl: 'app/components/introduction/introduction.html',
        controller: 'introductionController',
        controllerAs: 'introduction'
      })
      .state('charts', {
        url: '/charts',
        templateUrl: 'app/components/charts/charts.html',
        controller: 'chartsController',
        controllerAs: 'charts'
      })
      .state('angular', {
        url: '/angular',
        templateUrl: 'app/components/angular/angular.html',
        controller: 'angularController',
        controllerAs: 'angular'
      })
      .state('dbox', {
        url: '/dbox',
        templateUrl: 'app/components/dbox/dbox.html',
        controller: 'DboxController',
        controllerAs: 'dbox'
      })
      .state('challenge', {
        url: '/challenge',
        templateUrl: 'app/components/challenge/challenge.html',
        controller: 'challengeController',
        controllerAs: 'challenge'
      });

    $urlRouterProvider.otherwise('/start');
  }

})();
